using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharingPicsReact.Data
{
    public class ImagesRepository
    {
        private readonly string _connection;

        public ImagesRepository(string connection)
        {
            _connection = connection;
        }

        public List<Image> GetImages()
        {
            ImagesDataContext context = new ImagesDataContext(_connection);
            return context.Images.ToList();
        }

        public int AddImage(Image i)
        {
            ImagesDataContext context = new ImagesDataContext(_connection);
            context.Images.Add(i);
            context.SaveChanges();
            return i.Id;
        }

        public Image GetById(int id)
        {
            ImagesDataContext context = new ImagesDataContext(_connection);
            return context.Images.FirstOrDefault(i => i.Id == id);
        }

        public void AddLike(int id)
        {
            ImagesDataContext context = new ImagesDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"UPDATE Images SET Likes = (Likes + 1) WHERE Id = {id}");
        }
    }
}
