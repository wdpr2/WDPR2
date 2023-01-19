﻿using Microsoft.AspNetCore.Mvc;
using WDPR.Models;
using Microsoft.EntityFrameworkCore;

namespace WDPR.Controllers{

    public class ZaalMetStoelnummers : Zaal
    {

        public int? eersteRangs { get; set; }
        public int? tweedeRangs { get; set; }
        public int? derdeRangs { get; set; }

        public ZaalMetStoelnummers(int id) : base(id)
        {
        }
    }

    [ApiController]
    [Route("[controller]")]

    public class ZaalController : ControllerBase
    {
 
        private readonly DbTheaterLaakContext _context;

        public ZaalController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Zaal> GetZaal()
        {
            foreach(Stoel s in _context.Stoel)
            {
                Console.WriteLine(s.Id);
            }
            return _context.Zaal;
        }
        
        [HttpGet("zaal/{id}")]
        public IActionResult GetZaalById(int id)
        {
            var zaal = _context.GetZaal().Where(z => z.Id == id);
            if (zaal.Count() < 1)
            {
                return NotFound();
            }

            return Ok(zaal.First());
        }


        [HttpPost]
        public IActionResult PostZaal([FromBody] ZaalMetStoelnummers zms)
        {
            Zaal nieuweZaal = new Zaal(zms.Id);
            nieuweZaal.Stoelen = new List<Stoel>();
            _context.Zaal.Add(nieuweZaal);
            _context.SaveChangesAsync();

            for (int i = 0; i < zms.eersteRangs + zms.tweedeRangs + zms.derdeRangs; i++)
            {
                int rang = 0;
                if (i < zms.eersteRangs)
                {
                    rang = 1;
                } else if (i < zms.eersteRangs + zms.tweedeRangs)
                {
                    rang = 2;
                } else
                {
                    rang = 3;
                }
                Stoel nieuweStoel = new Stoel(){
                    Status = "Vrij",
                    Row = 0,
                    Rang = rang
                };
                nieuweZaal.Stoelen.Add(nieuweStoel);
            }

            _context.SaveChangesAsync();

            return Ok();
        }
    }
}
