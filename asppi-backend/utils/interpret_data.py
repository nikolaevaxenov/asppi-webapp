from utils import database
import struct
import datetime


def ole_to_epoch(ole):
    days = int(ole)
    hours = abs(ole - days) * 24
    return datetime.datetime(1899, 12, 30, 0, 0, 0) + datetime.timedelta(days=int(ole), hours=hours)


def interpret_RC():
    data = database.get_RC()
    result = []

    for line in data:
        funit = line[0]
        fdata = line[1]

        dt1 = ole_to_epoch(struct.unpack('d', fdata[:8])[0])
        rc1 = int.from_bytes(fdata[8:9])
        dt2 = ole_to_epoch(struct.unpack('d', fdata[9:17])[0])
        rc2 = int.from_bytes(fdata[17:18])
        dt3 = ole_to_epoch(struct.unpack('d', fdata[18:26])[0])
        rc3 = int.from_bytes(fdata[26:27])
        dt4 = ole_to_epoch(struct.unpack('d', fdata[27:35])[0])
        rc4 = int.from_bytes(fdata[35:36])
        dt5 = ole_to_epoch(struct.unpack('d', fdata[36:44])[0])
        rc5 = int.from_bytes(fdata[44:45])
        dt6 = ole_to_epoch(struct.unpack('d', fdata[45:53])[0])
        rc6 = int.from_bytes(fdata[53:54])
        dt7 = ole_to_epoch(struct.unpack('d', fdata[54:62])[0])
        rc7 = int.from_bytes(fdata[62:63])
        dt8 = ole_to_epoch(struct.unpack('d', fdata[63:71])[0])
        rc8 = int.from_bytes(fdata[71:72])
        dt9 = ole_to_epoch(struct.unpack('d', fdata[72:80])[0])
        rc9 = int.from_bytes(fdata[80:81])
        dt10 = ole_to_epoch(struct.unpack('d', fdata[81:89])[0])
        rc10 = int.from_bytes(fdata[89:90])
        dt11 = ole_to_epoch(struct.unpack('d', fdata[90:98])[0])
        rc11 = int.from_bytes(fdata[98:99])
        dt12 = ole_to_epoch(struct.unpack('d', fdata[99:107])[0])
        rc12 = int.from_bytes(fdata[107:108])
        dt13 = ole_to_epoch(struct.unpack('d', fdata[108:116])[0])
        rc13 = int.from_bytes(fdata[116:117])
        dt14 = ole_to_epoch(struct.unpack('d', fdata[117:125])[0])
        rc14 = int.from_bytes(fdata[125:126])
        dt15 = ole_to_epoch(struct.unpack('d', fdata[126:134])[0])
        rc15 = int.from_bytes(fdata[134:135])
        dt16 = ole_to_epoch(struct.unpack('d', fdata[135:143])[0])
        rc16 = int.from_bytes(fdata[143:144])
        
        result.append([
            [dt1, "Обновление данных о состоянии РУ в БД РУ", "УСПЕХ" if rc1==0 else ("Недоступность файлов ИИС" if rc1==1 else ("Необновление файлов ИИС за заданный интервал времени" if rc1==2 else "Прочее"))],
            [dt2, "Обновление данных о состоянии РУ в мапируемых областях памяти", "УСПЕХ" if rc2==0 else ("Отказ доступа к БД РУ" if rc2==1 else ("Начало операции" if rc2==2 else "Прочее"))],
            [dt3, "Формирование команды проведения расчета по программам РАСЧЕТ И ПРОВЕРКА", "Код: " + str(rc3)],
            [dt4, "Формирование команды запуска РАСЧЕТа", "Код: " + str(rc4)],
            [dt5, "Получение команды запуска программы РАСЧЕТ", "НАЧАЛО" if rc5==1 else "Код: " + str(rc5)],
            [dt6, "Формирование кода проверки времени ожидания начала расчета по программе РАСЧЕТ", "Расчет начат" if rc6==1 else "Рачет не начат"],
            [dt7, "Завершение программы РАСЧЕТ", "УСПЕХ" if rc7==1 else "Код: " + str(rc7)],
            [dt8, "Формирование кода проверки времени ожидания расчета по программе РАСЧЕТ", "УСПЕХ" if rc8==1 else "Расчет не произведен"],
            [dt9, "Формирование команды проведения проверки последовательности извлечения РС", "Код: " + str(rc9)],
            [dt10, "Получение команды запуска программы ПРОВЕРКА", "НАЧАЛО" if rc10==1 else "Код: " + str(rc10)],
            [dt11, "Формирование кода проверки времени ожидания начала расчета по программе ПРОВЕРКА", "НАЧАЛО" if rc11==1 else "Расчет не начат"],
            [dt12, "Завершение программы ПРОВЕРКА", "УСПЕХ" if rc12==1 else "Код: " + str(rc12)],
            [dt13, "Формирование кода проверки времени ожидания расчета по программе ПРОВЕРКА", "УСПЕХ" if rc13==1 else "Расчет не произведен"],
            [dt14, "Выдача протокола проведения проверки критериев для результатов в P1, P2, P3", "УСПЕХ" if rc14==1 else "Код: " + str(rc14)],
            [dt15, "Завершение цепочки проведения расчетов по программам РАСЧЕТ и ПРОВЕРКА", "УСПЕХ" if rc15==1 else "Код: " + str(rc15)],
            [dt16, "Завершение обработки команды проведения расчета по программам РАСЧЕТ и ПРОВЕРКА", "Код: " + str(rc16)],
        ])

    return result


def interpret_CL():
    data = database.get_CL()
    result = []

    for line in data:
        fdata = line[1].read()

        result.append([
            [struct.unpack('h', fdata[0:2])[0], "Полное число работоспособных ВРДР 1к / ВРДР2"],
            [struct.unpack('f', fdata[4:8])[0], "Мощности каналов c ВРДР 1к / ВРДР2"],
            [struct.unpack('f', fdata[1044:1048])[0], "Индивидуальные множители сигнала ВРДР 1к / 2к от энерговыработки ТВС"],
            [struct.unpack('f', fdata[2084:2088])[0], "Индивидуальные множители сигнала ВРДР 1к / 2к от интегрального тока"],
            [struct.unpack('f', fdata[3124:3128])[0], "Центрированное поле коэффициентов коррекции НФР в ячейках ВРДР1/2 к"],
            [struct.unpack('f', fdata[4164:4168])[0], "Радиальное распределение дисперсии случайнй составляющей РЭ2 по ВРДР1 / ВРДР2 / 1+2"],
            [struct.unpack('f', fdata[4224:4228])[0], "Радиальное распределение дисперсии калибровки ВРДР1 / ВРДР2"],
            [struct.unpack('f', fdata[4264:4268])[0], "значения параметров первичной отбраковки в ячейках ВРДР1/2 к"],
            [struct.unpack('f', fdata[5304:5308])[0], "значения параметров вторичной отбраковки в ячейках ВРДР1/2 к"],
            [struct.unpack('f', fdata[6344:6348])[0], "Дисперсия случайной составляющей распределения коэффициентов коррекции НФР в ячейках с ВРДР"],
            [struct.unpack('f', fdata[6356:6360])[0], "Физическая мощность в ячейках АЗ"],
            [struct.unpack('f', fdata[13892:13896])[0], "Тепловая мощность в ТК "],
            [struct.unpack('f', fdata[21428:21432])[0], "Дисперсия расчета тепловой мощности в ТК"],
            [struct.unpack('f', fdata[28964:28968])[0], "Коэффициенты запаса по мощности ТК с ТВС "],
            [struct.unpack('f', fdata[36500:36504])[0], "Полная тепловая мощность реактора"],
            [struct.unpack('f', fdata[36512:36516])[0], "Максимальная тепловая мощность ТК с ТВС"],
            [struct.unpack('f', fdata[36516:36520])[0], " коэффициент неравномерности по радиусу "],
            [struct.unpack('f', fdata[36520:36524])[0], "мощность реактора в % от номинала"],
            [struct.unpack('f', fdata[36524:36528])[0], "мощность реактора по четвертям "],
            [struct.unpack('f', fdata[36540:36544])[0], "мощность реактора по четвертям в % от полной мощности "],
            [struct.unpack('f', fdata[36556:36560])[0], "мощность реактора по половинам"],
            [struct.unpack('f', fdata[36564:36568])[0], "мощность реактора по половинам в % от полной мощности"],
            [struct.unpack('f', fdata[36572:36576])[0], "мощность реактора по барабанам-сепараторам "],
            [struct.unpack('f', fdata[36588:36592])[0], "мощность реактора по барабанам-сепараторам в % от номинала"],
            [struct.unpack('h', fdata[36604:36606])[0], "Полное число работоспособных ВРДВ 1к / ВРДВ2"],
            [struct.unpack('f', fdata[36608:36612])[0], "\"Приведенный\" сигнал секций ВРДВ 1к"],
            [struct.unpack('f', fdata[37184:37188])[0], "\"Приведенный\" сигнал секций ВРДВ 2к"],
            [struct.unpack('f', fdata[37760:37764])[0], "амплитуды гармоник ВРДВ 1к"],
            [struct.unpack('f', fdata[38336:38340])[0], "амплитуды гармоник ВРДВ 2к"],
            [struct.unpack('f', fdata[38912:38916])[0], "Абсолютное значение нормированной второй гармоники ВРДВ 1к / 2к"],
            [struct.unpack('f', fdata[39200:39204])[0], "Кz по ВРДВ1/2"],
            [struct.unpack('f', fdata[39488:39492])[0], "Положение максимума от верха а.з. "],
            [struct.unpack('f', fdata[39776:39780])[0], " Мощности каналов c ВРДВ 1к / ВРДВ2  "],
            [struct.unpack('f', fdata[40064:40068])[0], "ток ВРДВ 1к / 2к эквивалентный нормированному току ВРДР"],
            [struct.unpack('h', fdata[40352:40354])[0], "Абсолютные значения АРЭ ( кВт * 100)"],
            [struct.unpack('f', fdata[145856:145860])[0], "Амплитуды гармонического разложения  АРЭ"],
            [struct.unpack('f', fdata[176000:176004])[0], "Дисперсии нормированных коэффициентов разложения  АРЭ "],
            [struct.unpack('h', fdata[206144:206146])[0], "Максимальное энерговыделение по высоте ТК ( кВт)"],
            [struct.unpack('h', fdata[209912:209914])[0], "Положение максимума энерговыделения по высоте ТК (в см. от верха а.з.)"],
            [struct.unpack('h', fdata[213680:213682])[0], "Коэффициент аксиальной неравномерности АРЭ в каждом ТК (*100)"],
            [struct.unpack('f', fdata[217448:217452])[0], "Предельная допустимая мощность ТК по кризису ТО"],
            [struct.unpack('f', fdata[224984:224988])[0], "Коэффициенты запаса до предельной допустимой мощности по кризису теплообмена в ТК с ТВС"],
            [struct.unpack('f', fdata[232520:232524])[0], "Средняя плотность потока нейтронов по высоте реактора в 7 точках"],
            [struct.unpack('f', fdata[232548:232552])[0], "максимальная линейная мощность ТК с ТВС"],
            [struct.unpack('f', fdata[240084:240088])[0], "Коэффициенты запаса до предельной допустимой мощности по линейной тепловой мощности в ТК с ТВС"],
            [struct.unpack('f', fdata[247620:247624])[0], "Локальный коэффициент подогрева графита в местах размещения термопар контроля Т графита"],
            [struct.unpack('f', fdata[248020:248024])[0], "Значения измеренной температуры стыка с учетом погрешности термопар"],
            [struct.unpack('f', fdata[248420:248424])[0], "Усредненный коэффициент подогрева графита участков кладки"],
            [struct.unpack('f', fdata[248432:248436])[0], "Коэффициент тепловой инерционности графита для участков кладки по высоте"],
            [struct.unpack('f', fdata[248444:248448])[0], "Коэффициент тепловой инерционности графита на отметках размещения ТЭТ высоте"],
            [struct.unpack('f', fdata[248464:248468])[0], "энерговыделение с учетом тепловой инерционности в колоннах по высоте предыдущего расчета"],
            [struct.unpack('f', fdata[290064:290068])[0], "энерговыделение с учетом тепловой инерционности в колоннах по высоте"],
            [struct.unpack('f', fdata[331664:331668])[0], "поправки к показаниям ТЭТ"],
            [struct.unpack('f', fdata[331672:331676])[0], "СКвО локальных коэффициентов подогрева графита от среднего на участке"],
            [struct.unpack('f', fdata[331684:331688])[0], "относительное отклонение локального коэффициентов подогрева графита от среднего на каждом участке"],
            [struct.unpack('i', fdata[332084:332088])[0], "число работоспособных датчиков ТЭТ на участке 2"],
            [struct.unpack('f', fdata[332088:332092])[0], "Расчетное значение температуры стыка колонн в местах размещения секций ТЭТ"],
            [struct.unpack('f', fdata[332488:332492])[0], "СКвО расчетной температуры графита от измеренной с учетом поправки к показаниям термопар"],
            [struct.unpack('f', fdata[332492:332496])[0], "Максимальные расчетные температуры графита "],
            [struct.unpack('f', fdata[340416:340420])[0], "Коэффициент запаса до предельно-допустимой мощности по температуре графита"],
            [struct.unpack('f', fdata[348340:348344])[0], "Средняя температура графита по термопарам в АЗ"],
            [struct.unpack('f', fdata[348344:348348])[0], "Средняя расчетная температура графита на стыках колонн"],
            [ole_to_epoch(struct.unpack('d', fdata[348348:348356])[0]), "дата/время окончания окончания предыдущего расчета"],
            [ole_to_epoch(struct.unpack('d', fdata[348356:348364])[0]), "дата/время окончания окончания расчета"],
            [struct.unpack('d', fdata[348364:348372])[0], "Суммарная энерговыработка реактора"],
            [struct.unpack('f', fdata[348372:348376])[0], "Радиальный коэффициент учета ВРДР в УЗ-ЗАР"],
            [struct.unpack('f', fdata[349412:349416])[0], "значения уставок выравнивания ВРДР 1/2к для сигнализации от ИИС"],
            [struct.unpack('f', fdata[350452:350456])[0], "значения уставок безопасности ВРДР 1/2к для сигнализации от ИИС предыдущего расчета"],
            [struct.unpack('f', fdata[351492:351496])[0], "значения уставок безопасности ВРДР 1/2к для сигнализации от ИИС"],
            [struct.unpack('f', fdata[352532:352536])[0], "Выставленное положение корректора ВРДР 1/2к"],
            [struct.unpack('f', fdata[353572:353576])[0], "Расчетное положение корректора ВРДР 1/2к"],
            [struct.unpack('f', fdata[354612:354616])[0], "Дисперсия изменения уставок безопасности ВРДР 1/2к от предыдущего расчета"],
            [struct.unpack('f', fdata[354620:354624])[0], "Дисперсия изменения расчетного положения корректора ВРДР 1/2к "],
            [struct.unpack('f', fdata[354628:354632])[0], "Уставки безопасности ВРДВ 1к для сигнализации предыдущего расчета "],
            [struct.unpack('f', fdata[355204:355208])[0], "Уставки безопасности ВРДВ 2к для сигнализации предыдущего расчета"],
            [struct.unpack('f', fdata[355780:355784])[0], "Уставки безопасности ВРДВ 1к для сигнализации "],
            [struct.unpack('f', fdata[356356:356360])[0], "Уставки безопасности ВРДВ 2к для сигнализации"],
            [struct.unpack('f', fdata[356932:356936])[0], "Дисперсия изменения уставок безопасности ВРДВ 1/2к от предыдущего расчета"],
            [struct.unpack('h', fdata[356940:356942])[0], "Число неработоспособных ВРДР 1/2к в группах КСКУЗ-Р "],
            [struct.unpack('h', fdata[356964:356966])[0], "Число неработоспособных ВРДР в зонах АРВ"],
            [struct.unpack('h', fdata[357012:357014])[0], "Число (макс) неработоспособных соседних зон АРВ"],
            [struct.unpack('h', fdata[357016:357018])[0], "Число неработоспособных ВРДВ в группах КСКУЗ-В "],
            [struct.unpack('h', fdata[357040:357042])[0], "Число неработоспособных групп ВРДВ  КСКУЗ-В "],
            [struct.unpack('f', fdata[357044:357048])[0], "Суммарный ОЗР на РС по табличным градуировочным характеристикам (ГХ)"],
            [struct.unpack('h', fdata[357048:357050])[0], "Индивидуальный ОЗР на каждом стержне СУЗ (ГХ), умноженный на 100"],
            [struct.unpack('f', fdata[357504:357508])[0], "Суммарный ОЗР на стержнях по типам (ГХ)"],
            [struct.unpack('f', fdata[357544:357548])[0], "Суммарный оперативный запас реактивности по квадрантам активной зоны (ГХ)"],
            [struct.unpack('f', fdata[357560:357564])[0], "Суммарный ОЗР на РС по сигналам ВРД"],
            [struct.unpack('h', fdata[357564:357566])[0], "Индивидуальный ОЗР на каждом стержне СУЗ, умноженный на 100"],
            [struct.unpack('f', fdata[358020:358024])[0], "Суммарный ОЗР на стержнях по типам"],
            [struct.unpack('f', fdata[358060:358064])[0], "Суммарный оперативный запас реактивности по квадрантам активной зоны"],
            [struct.unpack('f', fdata[358076:358080])[0], "Значение начальной эффективности АЗ по реактору"],
            [struct.unpack('f', fdata[358080:358084])[0], "Изменение ОЗР за 1 сек после АЗ индивидуально"],
            [struct.unpack('f', fdata[358992:358996])[0], "Изменение ОЗР за 1 сек после АЗ по типам стержней"],
            [struct.unpack('f', fdata[359032:359036])[0], "Изменение ОЗР за 1 сек после АЗ по квадрантам активной зоны"],
            [struct.unpack('f', fdata[359048:359052])[0], "Тепловая мощность реактора по тепловому баллансу"],
            [struct.unpack('f', fdata[359052:359056])[0], "Тепловая мощность выделяемая в топливных каналах( WTEP - WSUZ)"],
            [struct.unpack('f', fdata[359056:359060])[0], "Поправка текущего коэффициента  (WTEP_TK / F0 )"],
            [struct.unpack('f', fdata[359060:359064])[0], "Коэффициенты усреднения групп ВРДР-1 КСКУЗ(по 6 чисел для ЛП и ПП)"],
            [struct.unpack('f', fdata[359108:359112])[0], "Коэффициенты усреднения групп ВРДР-2 КСКУЗ(по 6 чисел для ЛП и ПП)"],
            [struct.unpack('f', fdata[359156:359160])[0], "Средние значения нормированного сигнала по группам ВРДР-1 КСКУЗ (по 6 чисел для ЛП и ПП)"],
            [struct.unpack('f', fdata[359204:359208])[0], "Средние значения нормированного сигнала по группам ВРДР-2 КСКУЗ (по 6 чисел для ЛП и ПП)"],
            [struct.unpack('f', fdata[359252:359256])[0], "Амплитуды гармонического разложения  ППН по ПЭМ в каждом ТК"],
            [struct.unpack('f', fdata[389396:389400])[0], "средние локальные энерговыделения для отметок 1-5 вблизи температурных каналов"],
            [struct.unpack('f', fdata[390996:391000])[0], "Дисперсия расчета коэффициента аксиальной неравномерности, %**2"],
            [struct.unpack('f', fdata[398532:398536])[0], "Коэффициент объемной неравномерности"],
            [struct.unpack('h', fdata[398536:398538])[0], "Индекс в массиве 1884 с достигнутым значением Kv"],
            [struct.unpack('h', fdata[398538:398540])[0], "резерв"],
            [struct.unpack('h', fdata[398540:398542])[0], "Положения РС от предыдущего расчета, см"],
            [struct.unpack('f', fdata[398996:399000])[0], "ОЗР на РС, рассчитанный по сигналам ВРД, от предыдущего расчета, эфф. ст. РР"],
            [struct.unpack('f', fdata[399000:399004])[0], "Запас до уровня П2 для ВРД"],
            [struct.unpack('h', fdata[400040:400042])[0], "1 число – координата рекомендованного к перемещению РС, 2-е число – величина перемещения в см"],
            [struct.unpack('f', fdata[400080:400084])[0], "Разбалансы на РС (для каждого РС по 10 значений)"],
            # [struct.unpack('f', fdata[409200:409204])[0], "ОЗР, расчитанный по ВРД 1К"],
            # [struct.unpack('f', fdata[409204:409208])[0], "ОЗР, расчитанный по ВРД 2К"],
            # [struct.unpack('f', fdata[409208:409212])[0], "Паросодержание теплоносителя на выходе из каждого ТК, %"],
            # [struct.unpack('f', fdata[416744:416748])[0], "Максимальное паросодержание на выходе из ТК, %"],
            # [struct.unpack('h', fdata[416748:416750])[0], "Индекс ТК с максимальным паросодержанием теплоносителя на выходе в массиве 1884"],
            # [struct.unpack('h', fdata[416750:416752])[0], "резерв"],
            # [struct.unpack('f', fdata[416752:416756])[0], "Среднее паросодержание теплоносителя на выходе из ТК, %"],
        ])

        line[1].close()
    return result



def interpret_DA1():
    data = database.get_DA1()
    result = []

    for line in data:
        fdata = line[1]

        result.append([
            [struct.unpack('h', fdata[0:2])[0], "Глубина погружения стержней СУЗ (cм)"],
            [struct.unpack('f', fdata[456:460])[0], "Расходы теплоносителя в ТК и каналах КОСУЗ"],
            [struct.unpack('f', fdata[7992:7996])[0], "Расходы теплоносителя в КД 6747,5010,3067,1030"],
            [int.from_bytes(fdata[8008:8009]), "Признаки недостоверности положения стержней СУЗ (cм)"],
            [struct.unpack('f', fdata[8236:8240])[0], "Нормированные сигналы ВРДР-1 / 2"],
            [int.from_bytes(fdata[9276:9277]), "Признаки недостоверности ВРДР1 / 2"],
            [struct.unpack('f', fdata[9536:9540])[0], "Корректированные сигналы ВРДР-1 /2"],
            [struct.unpack('f', fdata[10576:10580])[0], "Сигналы секций ВРДВ1"],
            [struct.unpack('f', fdata[11152:11156])[0], "Сигналы секций ВРДВ2"],
            [int.from_bytes(fdata[11728:11729]), "Признак недостоверности секций ВРДВ1"],
            [int.from_bytes(fdata[11872:11873]), "Признак недостоверности секций ВРДВ2"],
            [struct.unpack('f', fdata[12016:12020])[0], "Среднее значение Р-БСл с учетом недостоверности "],
            [struct.unpack('f', fdata[12020:12024])[0], "Среднее значение Р-БСп с учетом недостоверности "],
            [struct.unpack('f', fdata[12024:12028])[0], "Давление в БС среднее"],
            [struct.unpack('f', fdata[12028:12032])[0], "Давление в напорном коллекторе ГЦН по половинам Р-НКл"],
            [struct.unpack('f', fdata[12032:12036])[0], "Давление в напорном коллекторе ГЦН по половинам Р-НКп"],
            [struct.unpack('f', fdata[12036:12040])[0], "Среднее значение с учетом недостоверности Т-ВКл"],
            [struct.unpack('f', fdata[12040:12044])[0], "Среднее значение с учетом недостоверности Т-ВКп"],
            [struct.unpack('f', fdata[12044:12048])[0], "Давление в деаэраторах"],
            [struct.unpack('f', fdata[12060:12064])[0], "Давление на напоре питательных насосов "],
            [struct.unpack('f', fdata[12068:12072])[0], "Расход питводы в БС по ниткам "],
            [struct.unpack('f', fdata[12100:12104])[0], "Расход питательной воды. Левая половина с учетом недостоверности замеров"],
            [struct.unpack('f', fdata[12104:12108])[0], "Расход питательной воды. Левая половина с учетом недостоверности замеров"],
            [struct.unpack('f', fdata[12108:12112])[0], "Суммарный расход питательной воды"],
            [struct.unpack('f', fdata[12112:12116])[0], "Производительность ГЦН"],
            [struct.unpack('f', fdata[12144:12148])[0], "Суммарный расход контура КМПЦ"],
            [struct.unpack('f', fdata[12148:12152])[0], "Расход КМПЦ по половинам  активной зоны"],
            [struct.unpack('f', fdata[12156:12160])[0], "Токи ГЦН"],
            [struct.unpack('f', fdata[12188:12192])[0], "Расход продувочной воды по половинам"],
            [struct.unpack('f', fdata[12196:12200])[0], "Температура продувочной воды перед доохладителем "],
            [struct.unpack('f', fdata[12200:12204])[0], "Температура продувочной воды после доохладителя "],
            [struct.unpack('f', fdata[12204:12208])[0], "Суммарный расход КОСУЗ"],
            [struct.unpack('f', fdata[12208:12212])[0], "Температура воды КО СУЗ на входе в теплообменники СУЗ"],
            [struct.unpack('f', fdata[12212:12216])[0], "Температура воды КО СУЗ на выходе из теплообменники СУЗ"],
            [struct.unpack('f', fdata[12216:12220])[0], "Показания термопар в пределах активной зоны (5  х число термопар)"],
            [int.from_bytes(fdata[12616:12617]), "Признаки запрета секций термопар (5  х число термопар)"],
            [ole_to_epoch(struct.unpack('d', fdata[12716:12724])[0]), "дата/время сохранения таблицы DA"],
            [struct.unpack('f', fdata[12724:12728])[0], "Мощность турбогенераторов"],
            [struct.unpack('f', fdata[12732:12736])[0], "Частота турбогенераторов"],
            # [struct.unpack('h', fdata[12740:12742])[0], "Признак включения АРБ: 0 – работает АРВ, 1 – работает АРБ"],
            # [struct.unpack('h', fdata[12742:12744])[0], "резерв"],
        ])
    
    return result


def interpret_WT():
    data = database.get_WT()
    result = []

    wtlen = 20
    wt_datetime = []
    wtw = []
    wtxe = []
    wti = []

    for line in data:
        fdata = line[1]
        for i in range(int(len(fdata)/wtlen)):
            dt = struct.unpack('d', fdata[i*wtlen:i*wtlen+8])[0]
            if dt > 0:
                result.append([
                    ole_to_epoch(dt),
                    "Дата/время",
                    struct.unpack('f', fdata[i*wtlen+8:i*wtlen+8+4])[0],
                    "Мощность",
                    struct.unpack('f', fdata[i*wtlen+8+4:i*wtlen+8+4+4])[0],
                    "Концентрация ксенона 135",
                    struct.unpack('f', fdata[i*wtlen+8+4+4:i*wtlen+8+4+4+4])[0],
                    "Концентрация йода 135"
                ])

    return result


def main():
    pass
    # rc = interpret_RC()
    # for l in rc:
    #     print(l)

    # cl = interpret_CL()
    # for l in cl:
    #     for i in l:
    #         print(i)

    # da1 = interpret_DA1()
    # for l in da1:
    #     for i in l:
    #         print(i)

    # wt = interpret_WT()
    # for l in wt:
    #     print(l)


if __name__=='__main__':
    main()

