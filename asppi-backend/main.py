from fastapi import FastAPI
from routers import rc, cl, da1, wt


app = FastAPI()

app.include_router(rc.router)
app.include_router(cl.router)
app.include_router(da1.router)
app.include_router(wt.router)
