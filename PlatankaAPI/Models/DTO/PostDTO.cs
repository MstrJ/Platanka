using System;
namespace PlatankaAPI.Models.DTO
{
	public class PostDTO
	{
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string[] ImagesIds { get; set; }
    }
}

