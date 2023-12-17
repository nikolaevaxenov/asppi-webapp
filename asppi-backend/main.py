from fastapi import FastAPI
from routers import test_route, troyka, polaris_checkmku, polaris_onload


app = FastAPI()

app.include_router(test_route.router)
app.include_router(troyka.router)
app.include_router(polaris_checkmku.router)
app.include_router(polaris_onload.router)
