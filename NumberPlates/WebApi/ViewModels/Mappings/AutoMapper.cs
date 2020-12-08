using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NumberPlates.WebApi.ViewModels.Mappings.Configurations;

namespace NumberPlates.WebApi.ViewModels.Mappings
{
    public class AutoMapper
    {
        private static IMapper _mapper;
        private static MapperConfiguration _config;

        public static void Configure()
        {
            _config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new EntitiesToViewModels());
            });

            _mapper = _config.CreateMapper();
        }

        public static IMapper GetMapper()
        {
            return _mapper;
        }
    }
}
