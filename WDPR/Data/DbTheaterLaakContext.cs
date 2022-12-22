﻿using Microsoft.EntityFrameworkCore;
using WDPR.Models;

public class DbTheaterLaakContext : DbContext
{
    public DbTheaterLaakContext (DbContextOptions<DbTheaterLaakContext> options)
        : base(options)
    {
    }

    public DbSet<Voorstelling> Voorstelling { get; set; }
    // public DbSet<Dag> Dag { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlite("Data Source=DbTheaterLaakContext.db");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }


}