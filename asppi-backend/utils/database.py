# Импорт необходимых библиотек и модулей
from dotenv import load_dotenv
import fdb
import os


# Загрузка переменных окружения из файла .env
load_dotenv()

# Установка соединения с базой данных Firebird
con = fdb.connect(dsn='../ASPPI/ABLCLD.FDB', user=os.getenv("DB_USER"), password=os.getenv("DB_PASSWORD"))
cur = con.cursor()

# Функция для получения данных из базы данных по метке 'RC'
def get_RC_from_database():
    # Запрос на получение UNIT, FDATA из таблицы TAFILESNOW
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='RC2';")
    # Получение всех данных отвечающих условию
    return cur.fetchall()

# Функция для получения данных из базы данных по метке 'CL'
def get_CL_from_database():
    # Запрос на получение UNIT, FDATA из таблицы TAFILESNOW
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='CL';")
    # Получение всех данных отвечающих условию
    return cur.fetchall()

# Функция для получения данных из базы данных по метке 'DA1'
def get_DA1_from_database():
    # Запрос на получение UNIT, FDATA из таблицы TAFILESNOW
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='DA1';")
    # Получение всех данных отвечающих условию
    return cur.fetchall()

# Функция для получения данных из базы данных по метке 'WT'
def get_WT_from_database():
    # Запрос на получение UNIT, FDATA из таблицы TAFILESNOW
    cur.execute("select FUNIT, FDATA from TAFILESNOW WHERE FNAME='WT';")
    # Получение всех данных отвечающих условию
    return cur.fetchall()
