using System;
using Microsoft.AspNetCore.Mvc;
using Models;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Models.Enums;
using PlatankaAPI.Services;

namespace PlatankaAPI.Controllers
{
    [Route("api/Posts")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IPostsService _postService;
        public PostController(IPostsService postsService)
        {
            _postService = postsService;
        }


        [HttpPost("")]
        public async Task<ActionResult<Post>> NewPost([FromBody] PostDTO postDTO)
        {
            var r = await _postService.AddNewPost(postDTO);
            return Ok(r);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(string id)
        {
            var r = await _postService.GetPostById(id);
            return Ok(r);
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            var r = await _postService.GetPosts();
            return Ok(r);
        }


        [HttpPatch("ChangeActivity/{id}")]
        public async Task<ActionResult> ChangeActivity(string id)
        {
            var r = await _postService.ChangeActivity(id);
            if (!r) return BadRequest("Wrong id");
            return Ok("Success - Changed Active");
        }

        [HttpPut("Update")]
        public async Task<ActionResult> Update(Post newpost)
        {
            var r = await _postService.UpdatePost(newpost);
            if (!r) return BadRequest("Something goes wrong");
            return Ok("Success - Updated Post");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var r = await _postService.Delete(id);
            if (!r) return BadRequest("Wrong id");
            return Ok("Success - Deleted Post");
        }

    }
}

