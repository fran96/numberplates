using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NumberPlates.Data;
using NumberPlates.Data.Interfaces;
using NumberPlates.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using NumberPlates.Data.Entities;
using NumberPlates.WebApi.Business;
using NumberPlates.WebApi.Business.Interfaces;
using NumberPlates.WebApi.ViewModels.Mappings.Configurations;
using NumberPlates.WebApi.Data.Interfaces;
using NumberPlates.WebApi.Data.Repositories;

namespace NumberPlates.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(x =>
                    x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            if (bool.TryParse(Configuration["IsProduction"], out var isProduction) && !isProduction)
            {
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo {Title = "Numberplates", Version = "v1"});
                });
            }

            var connectionString = Configuration.GetConnectionString("NPDatabase");
            services.AddDbContext<NumberPlateDbContext>(options => { options.UseNpgsql(connectionString); });

            services
                .AddHealthChecks()
                .AddNpgSql(connectionString);

            //----- Business / Services-----

            services.AddScoped<INumberPlateService, NumberPlateService>();
            services.AddScoped<ICommentService, CommentService>();

            //------------------

            //------ Data / repositories ------
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IGenericRepository<CommentEntity>, GenericRepository<CommentEntity>>();
            services.AddScoped<INumberPlateRepository, NumberPlateRepository>();
            services.AddScoped<IGenericRepository<NumberPlateEntity>, GenericRepository<NumberPlateEntity>>();
            //--------------

            // Auto Mapper Configurations
            var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new EntitiesToViewModels()); });

            services.AddAutoMapper(typeof(NumberPlates.WebApi.ViewModels.Mappings.Configurations.EntitiesToViewModels));
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyHeader();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Number plate docs"); });

            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
        }
    }
}