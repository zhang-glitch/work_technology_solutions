import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

dayjs.locale('zh')
dayjs.extend(duration)

export default dayjs
