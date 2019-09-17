import numeral from 'numeral'

function formatNumber(num) {
  return numeral(num).format('0,0.[00]')
}

function humanizeNumber(num) {
  let number = Math.abs(num)
  if (number < 1000) {
    return numeral(num).format('0.[0]a')
  }
  let humanized = numeral(number).format('0.00a')
  // 12.34M -> 12.3M
  if (humanized.length == 6) {
    humanized = numeral(number).format('0.[0]a')
  }
  // 123.45M -> 123M
  if (humanized.length == 7) {
    humanized = numeral(number).format('0.a')
  }
  return (num < 0 ? '-' : '') + humanized.toUpperCase()
}

function formatDatetime(datetime, isUTC = true) {
  if (!datetime) {
    return ''
  }
  const datetimeFormat = 'YY.MM.DD A hh:mm'
  let target = isUTC ? moment.utc(datetime).local() : moment(datetime)
  return target.format(datetimeFormat)
}

function formatDate(date, isUTC = true, short = false) {
  if (!date) {
    return ''
  }
  const dateFormat = short ? 'YY.MM.DD' : 'YYYY-MM-DD'
  let target = isUTC ? moment.utc(date).local() : moment(date)
  return target.format(dateFormat)
}

function formatTime(date, isUTC = true) {
  if (!date) {
    return ''
  }
  const dateFormat = 'A hh:mm'
  let target = isUTC ? moment.utc(date).local() : moment(date)
  return target.format(dateFormat)
}

function formatUrl(url) {
  url = url.indexOf('http') < 0 ? `http://${url}` : url

  return url
}

function formatMinutes(minutes = 0) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours) {
    return `${formatNumber(hours)}시간 ${mins}분`
  } else {
    return `${mins}분`
  }
}

function formatMilliseconds(ms = 0) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  seconds = String(seconds % 60)
  minutes = String(minutes % 60)

  if (100 <= Math.abs(hours)) {
    return `${formatNumber(hours)}h`
  }
  return `${String(hours).padStart(2, 0)}:${minutes.padStart(
    2,
    0
  )}:${seconds.padStart(2, 0)}`
}

function humanizeMilliseconds(ms = 0) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  seconds = String(Math.abs(seconds) % 60)
  minutes = String(Math.abs(minutes) % 60)

  let result = [`${seconds.padStart(2, 0)}s`]
  if (0 < minutes) {
    result.push(`${minutes.padStart(2, 0)}m`)
  }
  if (0 < hours && hours < 100) {
    result.push(`${String(hours).padStart(2, 0)}h`)
  }
  if (100 <= Math.abs(hours)) {
    return `${formatNumber(hours)}h`
  }

  return result
    .reverse()
    .slice(0, 2)
    .join(' ')
}

function formatTick(dateType) {
  return timestamp => {
    let date = moment(timestamp).local()
    let endDate = moment(date)
      .local()
      .add(1, dateType)
      .subtract(1, 'day')

    switch (dateType) {
      case 'day':
        return date.format('MM월 DD일')
      case 'week':
        return `${date.week()}주 (${date.format('M/DD')} - ${endDate.format(
          'M/DD'
        )})`
      case 'week-short':
        return `${date.week()}주`
      case 'month':
        return date.format('MM월')
      default:
        return date
    }
  }
}

function formatPhone(num) {
  // trim hyphens
  num = num.replace(/-/g, '')

  let formatNum = ''

  if (num.length == 11) {
    formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else {
    if (num.indexOf('02') == 0) {
      if (num.length == 9) {
        formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
      }
    } else {
      formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
  }
  return formatNum
}

export {
  formatNumber,
  humanizeNumber,
  formatDatetime,
  formatDate,
  formatTime,
  formatUrl,
  formatPhone,
  formatMinutes,
  formatMilliseconds,
  humanizeMilliseconds,
  formatTick,
}
