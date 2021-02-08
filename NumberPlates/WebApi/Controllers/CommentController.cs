using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NumberPlates.WebApi.Business.Interfaces;
using NumberPlates.WebApi.ViewModels.Models;

namespace NumberPlates.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;

        public CommentController(ICommentService commentService, IMapper mapper)
        {
            _commentService = commentService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<CommentViewModel>> GetAll()
        {
            var comments = await _commentService.GetAllCommentsAsync();
            return _mapper.Map<IEnumerable<CommentViewModel>>(comments);
        }

        [HttpGet("{id}")]
        public async Task<CommentViewModel> Get(int id)
        {
            var comment = await _commentService.GetCommentAsync(id);
            return _mapper.Map<CommentViewModel>(comment);
        }

        [HttpGet("/getCommentsByNumberPlate")]
        public async Task<IActionResult> GetCommentsByNumberPlate(string numberPlate)
        {
            if (string.IsNullOrWhiteSpace(numberPlate))
            {
                return BadRequest();
            }

            var comments = await _commentService.GetCommentsByNumberPlateAsync(numberPlate);
            return Ok(_mapper.Map<IEnumerable<CommentViewModel>>(comments));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CommentViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.NumberPlate) || string.IsNullOrWhiteSpace(model.Comment))
            {
                return BadRequest();
            }

            var ipAddress = GetIpAddress();
            var comment = await _commentService.CreateCommentAsync(model.Comment, model.NumberPlate, ipAddress);

            return Ok(_mapper.Map<CommentViewModel>(comment));
        }

        private string GetIpAddress()
        {
            if (HttpContext.Request.Headers.TryGetValue("X-Forwarded-For", out var ipAddress))
            {
                return ipAddress;
            }
            return "";
        }
    }
}