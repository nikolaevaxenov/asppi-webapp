from dotenv import load_dotenv
import fdb
import os


load_dotenv()


con = fdb.connect(dsn='../ASPPI/ABLCLD.FDB', user=os.getenv("DB_USER"), password=os.getenv("DB_PASSWORD"))
cur = con.cursor()


def get_RC():
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='RC2';")
    return cur.fetchall()


def get_CL():
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='CL';")
    return cur.fetchall()


def get_DA1():
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='DA1';")
    return cur.fetchall()


def get_WT():
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='WT';")
    return cur.fetchall()
