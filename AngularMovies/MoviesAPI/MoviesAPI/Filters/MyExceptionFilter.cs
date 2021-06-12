﻿using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Filters
{
    public class MyExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<MyExceptionFilter> logger;

        public MyExceptionFilter(ILogger<MyExceptionFilter> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            //here we are logging exception that occurs
            //this method will be executed only if there is exception
            logger.LogError(context.Exception, context.Exception.Message);

            base.OnException(context);
        }
    }
}