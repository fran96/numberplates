using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NumberPlates.WebApi.Business.Interfaces;
using NumberPlates.WebApi.ViewModels.Models;
using NumberPlates.WebApi.ViewModels;

namespace NumberPlates.WebApi.Controllers
{

        [ApiController]
        [Route("[controller]")]
        public class NumberPlateController : ControllerBase
        {
            private readonly ILogger<NumberPlateController> _logger;
            private readonly INumberPlateService _numberPlateService;
            private readonly IMapper _mapper;

            public NumberPlateController(ILogger<NumberPlateController> logger, INumberPlateService numberPlateService, IMapper mapper)
            {
                _logger = logger;
                _numberPlateService = numberPlateService;
                _mapper = mapper;
            }

            [HttpGet]
            public async Task<IEnumerable<NumberPlateViewModel>> GetAll()
            {
                var numberPlates = await _numberPlateService.GetAllNumberPlatesAsync();
                return _mapper.Map<IEnumerable<NumberPlateViewModel>>(numberPlates);
            }

            [HttpGet("{id}")]
            public async Task<NumberPlateViewModel> Get(int id)
            {
                var numberPlate = await _numberPlateService.GetNumberPlateByIdAsync(id);
                return _mapper.Map<NumberPlateViewModel>(numberPlate);
            }


            [HttpGet("/getByNumberPlate")]
            public async Task<NumberPlateViewModel> GetByNumberPlate(string numberPlate)
            {
                var np = await _numberPlateService.GetNumberPlateAsync(numberPlate);
                return _mapper.Map<NumberPlateViewModel>(np);
            }

            [HttpPost]
            public async Task<NumberPlateViewModel> Post(string numberPlate)
            {
                var numberplate = await _numberPlateService.CreateNumberPlateAsync(numberPlate);
                return _mapper.Map<NumberPlateViewModel>(numberplate);
            }

            [HttpPut]
            public async Task<NumberPlateViewModel> Put(int id, string numberPlate)
            {
                var numberplate = await _numberPlateService.UpdateNumberPlateAsync(id, numberPlate);
                return _mapper.Map<NumberPlateViewModel>(numberplate);
            }

            [HttpDelete]
            public async Task<bool> Delete(int id)
            {
                return await _numberPlateService.DeleteNumberPlateAsync(id);
            }
        }
    }
