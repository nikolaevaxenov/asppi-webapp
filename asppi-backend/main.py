from fastapi import FastAPI
from routers import test_route


app = FastAPI()

app.include_router(test_route.router)