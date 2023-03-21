import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger
} from '@nestjs/common'
import { Response } from 'express'
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  NotFoundError
} from './prisma.interface'

type MergedErrorTypes = PrismaClientKnownRequestError &
  PrismaClientUnknownRequestError &
  PrismaClientInitializationError &
  PrismaClientRustPanicError &
  PrismaClientValidationError &
  NotFoundError

@Catch(PrismaClientKnownRequestError)
export class PrismaKnownExceptionFilter
  implements ExceptionFilter<PrismaClientKnownRequestError>
{
  catch(
    exception: PrismaClientKnownRequestError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception.code)
    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

@Catch(PrismaClientUnknownRequestError)
export class PrismaUnknownExceptionFilter
  implements ExceptionFilter<PrismaClientUnknownRequestError>
{
  catch(
    exception: PrismaClientUnknownRequestError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

@Catch(PrismaClientValidationError)
export class PrismaValidationExceptionFilter
  implements ExceptionFilter<PrismaClientValidationError>
{
  catch(exception: PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

@Catch(NotFoundError)
export class PrismaNotFoundExceptionFilter
  implements ExceptionFilter<NotFoundError>
{
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

@Catch(PrismaClientInitializationError)
export class PrismaInitializationExceptionFilter
  implements ExceptionFilter<PrismaClientInitializationError>
{
  catch(
    exception: PrismaClientInitializationError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

@Catch(PrismaClientRustPanicError)
export class PrismaRustPanicExceptionFilter
  implements ExceptionFilter<PrismaClientRustPanicError>
{
  catch(exception: PrismaClientRustPanicError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    Logger.error(exception)

    response.status(400).json({
      statusCode: 400,
      message: getErrorMessageByCode(exception)
    })
  }
}

const getErrorMessageByCode = (
  exception: Partial<MergedErrorTypes>
): string => {
  switch (exception.code) {
    //! Common
    case 'P1000':
      return `"Authentication failed against database server at ${
        exception.meta!.database_host
      }, the provided database credentials for ${
        exception.meta!.database_user
      } are not valid. Please make sure to provide valid database credentials for the database server at ${
        exception.meta!.database_host
      }.`

    case 'P1001':
      return `Can't reach database server at ${
        exception.meta!.database_host
      }:${
        exception.meta!.database_port
      } Please make sure your database server is running at ${
        exception.meta!.database_host
      }:${exception.meta!.database_port}.`

    case 'P1002':
      return `The database server at ${
        exception.meta!.database_host
      }:${
        exception.meta!.database_port
      } was reached but timed out. Please try again. Please make sure your database server is running at ${
        exception.meta!.database_host
      }:${exception.meta!.database_port}.`

    case 'P1003':
      return exception.meta!.database_file_name
        ? `Database ${
            exception.meta!.database_file_name ?? ''
          } does not exist at ${
            exception.meta!.database_file_path ?? ''
          }`
        : exception.meta!.database_schema_name
        ? `Database ${exception.meta!.database_name ?? ''}.${
            exception.meta!.database_schema_name ?? ''
          } does not exist on the database server at ${
            exception.meta!.database_host ?? ''
          }:${exception.meta!.database_port ?? ''}.`
        : `Database ${
            exception.meta!.database_name ?? ''
          } does not exist on the database server at ${
            exception.meta!.database_host ?? ''
          }:${exception.meta!.database_port ?? ''}.`

    case 'P1008':
      return `Operations timed out after ${
        exception.meta!.time ?? ''
      }.`

    case 'P1009':
      return `Database ${
        exception.meta!.database_name ?? ''
      } already exists on the database server at ${
        exception.meta!.database_host ?? ''
      }:${exception.meta!.database_port ?? ''}`

    case 'P1010':
      return `User ${
        exception.meta!.database_user ?? ''
      } was denied access on the database ${
        exception.meta!.database_name ?? ''
      }`

    case 'P1011':
      return `Error opening a TLS connection: ${
        exception.meta!.message ?? ''
      }`

    case 'P1012':
      return `${exception.meta!.full_error ?? ''}`

    case 'P1013':
      return `The provided database string is invalid. ${
        exception.meta!.details ?? ''
      }`

    case 'P1014':
      return `The underlying ${
        exception.meta!.kind ?? ''
      } for model ${exception.meta!.model ?? ''} does not exist.`

    case 'P1015':
      return `Your Prisma schema is using features that are not supported for the version of the database.
      Database version: ${exception.meta!.database_version ?? ''}
      Errors:${exception.meta!.errors ?? ''}`

    case 'P1016':
      return `Your raw query had an incorrect number of parameters. Expected: ${
        exception.meta!.expected ?? ''
      }, actual: ${exception.meta!.actual ?? ''}.`

    case 'P1017':
      return `Server has closed the connection.`

    //! Prisma Client (Query Engine)
    case 'P2000':
      return `The provided value for the column is too long for the column's type. Column: ${
        exception.meta!.column_name ?? ''
      }`

    case 'P2001':
      return `The record searched for in the where condition (${
        exception.meta!.model_name ?? ''
      }.${exception.meta!.argument_name ?? ''} = ${
        exception.meta!.argument_value ?? ''
      }) does not exist`

    case 'P2002':
      return `Unique constraint failed on the ${
        Array.isArray(exception.meta!.target)
          ? [...exception.meta!.target].join(', ')
          : exception.meta?.target ?? ''
      }`
    case 'P2003':
      return `Foreign key constraint failed on the field: ${
        exception.meta!.field_name ?? ''
      }`

    case 'P2004':
      return `A constraint failed on the database: ${
        exception.meta!.database_error ?? ''
      }`

    case 'P2005':
      return `The value ${
        exception.meta!.field_value ?? ''
      } stored in the database for the field ${
        exception.meta!.field_name ?? ''
      } is invalid for the field's type`

    case 'P2006':
      return `The provided value ${
        exception.meta!.field_value ?? ''
      } for ${exception.meta!.model_name ?? ''} field ${
        exception.meta!.field_name ?? ''
      } is not valid`

    case 'P2007':
      return `Data validation error ${
        exception.meta!.database_error ?? ''
      }`

    case 'P2008':
      return `Failed to parse the query ${
        exception.meta!.query_parsing_error ?? ''
      } at ${exception.meta!.query_position ?? ''}`

    case 'P2009':
      return `Failed to validate the query: ${
        exception.meta!.query_validation_error ?? ''
      } at ${exception.meta!.query_position ?? ''}`

    case 'P2010':
      return `Raw query failed. Code: ${
        exception.meta!.code ?? ''
      }. Message: ${exception.meta!.message ?? ''}`

    case 'P2011':
      return `Null constraint violation on the ${
        Array.isArray(exception.meta!.target)
          ? [...exception.meta!.target].join(', ')
          : exception.meta?.target ?? ''
      }`

    case 'P2012':
      return `Missing a required value at ${
        exception.meta!.path ?? ''
      }`

    case 'P2013':
      return `Missing the required argument ${
        exception.meta!.argument_name ?? ''
      } for field ${exception.meta!.field_name ?? ''} on ${
        exception.meta!.object_name ?? ''
      }.`

    case 'P2014': {
      //? Splits pascal case string and turns the first char of first word into capitalized
      //? and turns other words' first char into lowercase as well.
      // let parsedString = String(exception.meta!.model_b_name)
      //   .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
      //   .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      //   .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      //   .replace(/^./, function (str: string) {
      //     return str.toUpperCase()
      //   })
      //   .replace(/ \w/, function (str: string) {
      //     return str.toLowerCase()
      //   })
      //   .trim()

      // return `${parsedString} is already exists!`
      return `The change you are trying to make would violate the required relation '${
        exception.meta!.relation_name
      }' between the ${exception.meta!.model_a_name} and ${
        exception.meta!.model_b_name
      } models.`
    }

    case 'P2015':
      return `A related record could not be found. ${
        exception.meta!.details ?? ''
      }`

    case 'P2016':
      return `Query interpretation error. ${
        exception.meta!.details ?? ''
      }`

    case 'P2017':
      return `The records for relation ${
        exception.meta!.relation_name ?? ''
      } between the ${exception.meta!.parent_name ?? ''} and ${
        exception.meta!.child_name ?? ''
      } models are not connected.`

    case 'P2018':
      return `The required connected records were not found. ${
        exception.meta!.details ?? ''
      }`

    case 'P2019':
      return `Input error. ${exception.meta!.details ?? ''}`

    case 'P2020':
      return `Value out of range for the type. ${
        exception.meta!.details ?? ''
      }`

    case 'P2021':
      return `The table ${
        exception.meta!.table ?? ''
      } does not exist in the current database.`

    case 'P2022':
      return `The column ${
        exception.meta!.column ?? ''
      } does not exist in the current database.`

    case 'P2023':
      return `Inconsistent column data: ${
        exception.meta!.message ?? ''
      }`

    case 'P2024':
      return `Timed out fetching a new connection from the connection pool. (Current connection pool timeout: ${
        exception.meta!.timeout ?? ''
      }, connection limit: ${exception.meta!.connection_limit ?? ''})`

    case 'P2025':
      return `An operation failed because it depends on one or more records that were required but not found. ${
        exception.meta!.cause ?? ''
      }`

    case 'P2026':
      return `The current database provider doesn't support a feature that the query used: ${
        exception.meta!.feature ?? ''
      }`

    case 'P2027':
      return `Multiple errors occurred on the database during query execution: ${
        exception.meta!.errors ?? ''
      }`

    case 'P2028':
      return `Transaction API error: ${exception.meta!.error ?? ''}`

    case 'P2030':
      return `Cannot find a fulltext index to use for the search.`

    case 'P2031':
      return `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.`

    case 'P2033':
      return `A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers.`

    case 'P2034':
      return `Transaction failed due to a write conflict or a deadlock. Please retry your transaction.`

    //! Prisma Migrate (Migration Engine)
    case 'P3000':
      return `Failed to create database: ${
        exception.meta!.database_error ?? ''
      }`

    case 'P3001':
      return `Migration possible with destructive changes and possible data loss: ${
        exception.meta!.migration_engine_destructive_details ?? ''
      }`

    case 'P3002':
      return `The attempted migration was rolled back: ${
        exception.meta!.database_error ?? ''
      }`

    case 'P3003':
      return `The format of migrations changed, the saved migrations are no longer valid.`

    case 'P3004':
      return `The ${
        exception.meta!.database_name ?? ''
      } database is a system database, it should not be altered with prisma migrate. Please connect to another database.`

    case 'P3005':
      return `The database schema is not empty.`

    case 'P3006':
      return `Migration ${
        exception.meta!.migration_name ?? ''
      } failed to apply cleanly to the shadow database.
      ${exception.meta!.error_code ?? ''} Error:
      ${exception.meta!.inner_error ?? ''}`

    case 'P3007':
      return `Some of the requested preview features are not yet allowed in migration engine. Please remove them from your data model before using migrations. (blocked: ${
        exception.meta!.list_of_blocked_features ?? ''
      })`

    case 'P3008':
      return `The migration ${
        exception.meta!.migration_name ?? ''
      } is already recorded as applied in the database.`

    case 'P3009':
      return `Migrate found failed migrations in the target database, new migrations will not be applied.`

    case 'P3010':
      return `The name of the migration is too long. It must not be longer than 200 characters (bytes).`

    case 'P3011':
      return `Migration ${
        exception.meta!.migration_name ?? ''
      } cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? (example: "20201207184859_initial_migration")`

    case 'P3012':
      return `Migration ${
        exception.meta!.migration_name ?? ''
      } cannot be rolled back because it is not in a failed state.`

    case 'P3013':
      return `Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider.`

    case 'P3014':
      return `Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases.
      Original error: ${exception.meta!.error_code ?? ''}
      ${exception.meta!.inner_error ?? ''}`

    case 'P3015':
      return `Could not find the migration file at ${
        exception.meta!.migration_file_path ?? ''
      }. Please delete the directory or restore the migration file.`

    case 'P3016':
      return `The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: ${
        exception.meta!.error_code ?? ''
      }
      ${exception.meta!.inner_error ?? ''}`

    case 'P3017':
      return `The migration ${
        exception.meta!.migration_name ?? ''
      } could not be found. Please make sure that the migration exists, and that you included the whole name of the directory. (example: "20201207184859_initial_migration")`

    case 'P3018':
      return `A migration failed to apply. New migrations cannot be applied before the error is recovered from.

      Migration name: ${exception.meta!.migration_name ?? ''}
      
      Database error code: ${
        exception.meta!.database_error_code ?? ''
      }
      
      Database error:
      ${exception.meta!.database_error ?? ''}`

    case 'P3019':
      return `The datasource provider ${
        exception.meta!.provider ?? ''
      } specified in your schema does not match the one specified in the migration_lock.toml, ${
        exception.meta!.expected_provider ?? ''
      }. Please remove your current migration directory and start a new migration history with prisma migrate dev.`

    case 'P3020':
      return `The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the shadowDatabaseUrl datasource attribute.`

    case 'P3021':
      return `Foreign keys cannot be created on this database.`

    case 'P3022':
      return `Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database.`

    //! prisma db pull (Introspection Engine)
    case '4000':
      return `Introspection operation failed to produce a schema file: ${
        exception.meta!.introspection_error ?? ''
      }`

    case '4001':
      return `The introspected database was empty.`

    case '4002':
      return `The schema of the introspected database was inconsistent: ${
        exception.meta!.explanation ?? ''
      }`

    //! Data Proxy
    case '5000':
      return `This request could not be understood by the server`

    case '5001':
      return `This request must be retried`

    case '5002':
      return `The datasource provided is invalid:
      -Could not parse the URL of the datasource
      -Datasource URL must use prisma:// protocol when --data-proxy is used
      -No valid API key found
      `

    case '5003':
      return `Requested resource does not exist`

    case 'P5004':
      return `The feature is not yet implemented:
      beforeExit event is not yet supported
      `

    case 'P5005':
      return `Schema needs to be uploaded`

    case 'P5006':
      return `Unknown server error`

    case 'P5007':
      return `Unauthorized, check your connection string`

    case 'P5008':
      return `Usage exceeded, retry again later`

    case 'P5009':
      return `Request timed out`

    case 'P5010':
      return `Cannot fetch data from service`

    case 'P5011':
      return `Request parameters are invalid.`

    case 'P5012':
      return `Engine version is not supported.`

    case 'P5013':
      return `Engine not started: healthcheck timeout`

    case 'P5014':
      return `Unknown engine startup error (contains message and logs)`

    case 'P5015':
      return `Interactive transaction error:
      -Could not parse interactive transaction ID
      -Could not find Query Engine for the specified host and transaction ID
      -Could not start interactive transaction`

    default:
      return exception.message!
  }
}

export const prismaFilters = [
  new PrismaKnownExceptionFilter(),
  new PrismaUnknownExceptionFilter(),
  new PrismaValidationExceptionFilter(),
  new PrismaNotFoundExceptionFilter(),
  new PrismaInitializationExceptionFilter(),
  new PrismaRustPanicExceptionFilter()
]
