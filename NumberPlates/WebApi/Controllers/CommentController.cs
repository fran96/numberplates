using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NumberPlates.WebApi.Business.Interfaces;
using NumberPlates.WebApi.ViewModels.Models;
using System;

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
            public async Task<IEnumerable<CommentViewModel>> GetCommentsByNumberPlate(string numberPlate)
            {
                var comments = await _commentService.GetCommentsByNumberPlateAsync(numberPlate);
                return _mapper.Map<IEnumerable<CommentViewModel>>(comments);
            }

            [HttpPost]
            public async Task<CommentViewModel> Post(string comment, DateTime timestamp,
            string ipAddress, string numberPlate) {

                var c = await _commentService.CreateCommentAsync(comment, timestamp, ipAddress, numberPlate);

                return _mapper.Map<CommentViewModel>(c);
            }
        }
    }
