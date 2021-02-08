using System;
using System.Net.Http;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Api
{
    public class AddHeader : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (string.Equals(context.ApiDescription.HttpMethod, HttpMethod.Post.Method, StringComparison.InvariantCultureIgnoreCase))
            {
                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "Sys",
                    In = ParameterLocation.Header,
                    Required = false,
                    Example = new OpenApiString("Sys")
                });
            }
        }
    }
}