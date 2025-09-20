from fastapi.responses import JSONResponse

class HTTPResponse:

    ERROR_CODES = {
        "VALIDATION_FAILED": "ERR_400",
        "SERVER_ERROR": "ERR_500",
    }

    @staticmethod
    def success(result=[], message="Successfully processed."):
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "result": result,
                "message": message
            }
        )

    @staticmethod
    def error(message="Error encountered.", status_code=500, error_code='ERR_001', result=[], error='SERVER_ERROR'):
        return JSONResponse(
            status_code=status_code,
            content={
                "success": False,
                "error_code": HTTPResponse.ERROR_CODES.get(error, error_code),
                "result": result,
                "message": message
            }
        )