using ProductCatalog.Api.Config;
using ProductCatalog.Api.Models;
using Dapper;
using System.Data;

namespace ProductCatalog.Api.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly DbConfig _dbConfig;

    public ProductRepository(DbConfig dbConfig)
    {
        _dbConfig = dbConfig;
    }

    public async Task<IEnumerable<Product>> GetAll()
    {
        using var connection = _dbConfig.CreateConnection();

        var query = @"
            SELECT 
                id,
                code,
                description,
                department_code AS DepartmentCode,
                price,
                is_active AS IsActive,
                deleted
            FROM products 
            WHERE deleted = FALSE";

        return await connection.QueryAsync<Product>(query);
    }

    public async Task<Product?> GetById(Guid id)
    {
        using var connection = _dbConfig.CreateConnection();

        var query = @"
            SELECT 
                id,
                code,
                description,
                department_code AS DepartmentCode,
                price,
                is_active AS IsActive,
                deleted
            FROM products 
            WHERE id = @Id AND deleted = FALSE";

        return await connection.QueryFirstOrDefaultAsync<Product>(query, new { Id = id });
    }

    public async Task Create(Product product)
    {
        using var connection = _dbConfig.CreateConnection();
        var query = @"INSERT INTO products (id, code, description, department_code, price, is_active, deleted)
                      VALUES (@Id, @Code, @Description, @DepartmentCode, @Price, @IsActive, @Deleted)";
        await connection.ExecuteAsync(query, product);
    }

    public async Task Update(Product product)
    {
        using var connection = _dbConfig.CreateConnection();
        var query = @"UPDATE products
                      SET code = @Code,
                          description = @Description,
                          department_code = @DepartmentCode,
                          price = @Price,
                          is_active = @IsActive
                      WHERE id = @Id";
        await connection.ExecuteAsync(query, product);
    }

    public async Task Delete(Guid id)
    {
        using var connection = _dbConfig.CreateConnection();
        var query = "UPDATE products SET deleted = TRUE WHERE id = @Id";
        await connection.ExecuteAsync(query, new { Id = id });
    }
}
