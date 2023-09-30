using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PlatankaAPI.Models.obj;
using PlatankaAPI.Services;

namespace PlatankaAPI.Controllers
{
    [Route("api/Images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {

        private IImageService _imageService;
        public ImagesController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("")]
        public async Task<IActionResult> AddImage(IFormFile file, [FromForm] string description)
        {
            bool r = await _imageService.AddImage(file, description);
            if(r) return Ok("Image uploaded successfully.");
            return BadRequest("Invalid file.");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest("Invalid ID");
            }

            
            var (data, contentType) = await _imageService.GetImage(id);

            if (data == null || contentType == null)
            {
                return NotFound(); 
            }

            return File(data, contentType);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetImages()
        {
       
            var images = await _imageService.GetImages();

            if (images == null || !images.Any())
            {
                return NotFound("No images found.");
            }
            return  Ok(images);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var r = await _imageService.Delete(id);
            if (r) return Ok("Deleted image");
            return BadRequest("Not existing id");
        }

    }
}