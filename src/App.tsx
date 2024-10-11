import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, X, MoreHorizontal, Copy, FileDown, Send, Plus, Trash, ArrowUpDown } from 'lucide-react'

export default function Component() {
const [systemMessage, setSystemMessage] = useState('')
const [bookingDate, setBookingDate] = useState('')
const [bookingLocation, setBookingLocation] = useState('')
const [bookingStaff, setBookingStaff] = useState('')
const [bookingTime, setBookingTime] = useState('')
const [bookingPackage, setBookingPackage] = useState('')
const [bookingCount, setBookingCount] = useState('')
const [bookingAmount, setBookingAmount] = useState('')
const [bookingSales, setBookingSales] = useState('')
const [bookingExtra, setBookingExtra] = useState('')
const [currentPath, setCurrentPath] = useState(['所有預約表'])
const [appointments, setAppointments] = useState([
  { time: '13:00', package: '60分鐘', count: '2s', amount: '2000', sales: '王小明', status: '約' },
  { time: '14:30', package: '90分鐘', count: '2s', amount: '3000', sales: '李小華', status: 'O' },
  { time: '16:00', package: '30分鐘', count: '1s', amount: '1000', sales: '張小美', status: 'X' },
])
const [dateOptions, setDateOptions] = useState([])
const [sortOrder, setSortOrder] = useState('asc')
const [inquiryTime, setInquiryTime] = useState('')
const [inquiryPackage, setInquiryPackage] = useState('')

const timeOrder = [
  '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
  '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
  '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
  '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
  '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
  '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
  '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
  '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
  '21:00', '21:10', '21:20', '21:30', '21:40', '21:50',
  '22:00', '22:10', '22:20', '22:30', '22:40', '22:50',
  '23:10', '23:20', '23:30', '23:40', '23:50',
  '00:00', '00:10', '00:20', '00:30', '00:40', '00:50',
  '01:00', '01:10', '01:20', '01:30', '01:40', '01:50',
  '02:00'
]

useEffect(() => {
  const today = new Date()
  const options = []
  for (let i = -1; i <= 15; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    options.push(date.toISOString().split('T')[0])
  }
  setDateOptions(options)
  setBookingDate(options[1]) // Set default to today
}, [])

const handleBooking = () => {
  const newAppointment = {
    time: bookingTime,
    package: bookingPackage,
    count: bookingCount,
    amount: bookingAmount,
    sales: bookingSales,
    status: '約'
  }
  setAppointments([...appointments, newAppointment])
  setSystemMessage(`登記完成！
時間：${bookingDate} - ${bookingTime}
女孩：${bookingStaff}
方案：${bookingPackage} / ${bookingCount} / ${bookingAmount}
業務：${bookingSales}${bookingExtra ? `
加值：${bookingExtra}` : ''}`)
  // Reset input fields
  setBookingTime('')
  setBookingPackage('')
  setBookingCount('')
  setBookingAmount('')
  setBookingSales('')
  setBookingExtra('')
}

const handleInquiry = () => {
  setSystemMessage(`A美容師
14:00 可約 / 15:00 有約
16:00 可約 / 17:00 有約
18:00 可約`)
}

const handlePathClick = (index) => {
  setCurrentPath(currentPath.slice(0, index + 1))
}

const handleAddPage = () => {
  const newPage = `新分頁${currentPath.length}`
  setCurrentPath([...currentPath, newPage])
}

const handleDeletePage = () => {
  if (currentPath.length > 1) {
    setCurrentPath(currentPath.slice(0, -1))
  }
}

const handleStatusChange = (index, newStatus) => {
  const newAppointments = [...appointments]
  newAppointments[index].status = newStatus
  setAppointments(newAppointments)
}

const handleDeleteAppointment = (index) => {
  const newAppointments = appointments.filter((_, i) => i !== index)
  setAppointments(newAppointments)
}

const handleEditAppointment = (index, updatedAppointment) => {
  const newAppointments = [...appointments]
  newAppointments[index] = updatedAppointment
  setAppointments(newAppointments)
}

const generateExcel = () => {
  console.log('Generating Excel file...')
  // Implement Excel generation logic here
}

const sendNotification = () => {
  console.log('Sending notification...')
  // Implement notification sending logic here
}

const handleSort = () => {
  const sortedAppointments = [...appointments].sort((a, b) => {
    const indexA = timeOrder.indexOf(a.time)
    const indexB = timeOrder.indexOf(b.time)
    return sortOrder === 'asc' ? indexA - indexB : indexB - indexA
  })
  setAppointments(sortedAppointments)
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
}

return (
  <div className="flex h-screen bg-white">
    <div className="w-[35%] flex flex-col p-4 overflow-auto border-r border-gray-200">
      <Card className="mb-4 bg-white border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-600">預約登記</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Select value={bookingDate} onValueChange={setBookingDate}>
              <SelectTrigger>
                <SelectValue placeholder="選擇日期" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date} value={date}>{date}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={bookingLocation} onValueChange={setBookingLocation}>
              <SelectTrigger>
                <SelectValue placeholder="館別選擇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="中山館">中山館</SelectItem>
                <SelectItem value="西門館">西門館</SelectItem>
                <SelectItem value="信義館">信義館</SelectItem>
                <SelectItem value="內湖館">內湖館</SelectItem>
                <SelectItem value="松山館">松山館</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bookingStaff} onValueChange={setBookingStaff}>
              <SelectTrigger>
                <SelectValue placeholder="女孩選擇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A女孩">A女孩</SelectItem>
                <SelectItem value="B女孩">B女孩</SelectItem>
                <SelectItem value="C女孩">C女孩</SelectItem>
                <SelectItem value="D女孩">D女孩</SelectItem>
                <SelectItem value="E女孩">E女孩</SelectItem>
                <SelectItem value="F女孩">F女孩</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Input placeholder="預約訊息" value={bookingExtra} onChange={(e) => setBookingExtra(e.target.value)} />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleBooking}>預約登記</Button>
        </CardContent>
      </Card>
      <Card className="mb-4 bg-white border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-600">預約查詢</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="選擇日期" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date} value={date}>{date}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="館別選擇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="中山館">中山館</SelectItem>
                <SelectItem value="西門館">西門館</SelectItem>
                <SelectItem value="信義館">信義館</SelectItem>
                <SelectItem value="內湖館">內湖館</SelectItem>
                <SelectItem value="松山館">松山館</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="女孩選擇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A女孩">A女孩</SelectItem>
                <SelectItem value="B女孩">B女孩</SelectItem>
                <SelectItem value="C女孩">C女孩</SelectItem>
                <SelectItem value="D女孩">D女孩</SelectItem>
                <SelectItem value="E女孩">E女孩</SelectItem>
                <SelectItem value="F女孩">F女孩</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input 
              placeholder="時間輸入" 
              value={inquiryTime}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                if (value.length === 4) {
                  const hours = value.slice(0, 2);
                  const minutes = value.slice(2, 4);
                  setInquiryTime(`${hours}:${minutes}`);
                } else {
                  setInquiryTime(value);
                }
              }}
            />
            <Input 
              placeholder="方案輸入" 
              value={inquiryPackage}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setInquiryPackage(value);
              }}
            />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleInquiry}>查詢預約</Button>
        </CardContent>
      </Card>
      <Card className="bg-white border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-600">系統訊息</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={`whitespace-pre-wrap ${systemMessage.includes('無法預約') ? 'text-red-600' : 'text-green-600'}`}>{systemMessage}</pre>
          {systemMessage && (
            <Button variant="outline" className="mt-2 border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => navigator.clipboard.writeText(systemMessage)}>
              <Copy className="w-4 h-4 mr-2" />
              複製
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
    <div className="w-[65%] p-4 overflow-auto">
      <Card className="bg-white border border-blue-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {currentPath.map((item, index) => (
                <span key={index} className="cursor-pointer hover:underline text-blue-600" onClick={() => handlePathClick(index)}>
                  {item} {index < currentPath.length - 1 && '>'}
                </span>
              ))}
            </div>
            <div>
              <Button variant="outline" size="sm" className="mr-2 border-blue-600 text-blue-600 hover:bg-blue-50" onClick={handleAddPage}>
                <Plus className="w-4 h-4 mr-2" />
                新增分頁
              </Button>
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={handleDeletePage}>
                <Trash className="w-4 h-4 mr-2" />
                刪除分頁
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="bg-blue-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">所有預約</TabsTrigger>
              <TabsTrigger value="available"   className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">可約時間</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={handleSort} className="text-blue-600">
                        時間
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>方案</TableHead>
                    <TableHead>次數</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>業務名稱</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.package}</TableCell>
                      <TableCell>{appointment.count}</TableCell>
                      <TableCell>{appointment.amount}</TableCell>
                      <TableCell>{appointment.sales}</TableCell>
                      <TableCell>
                        <Select value={appointment.status} onValueChange={(value) => handleStatusChange(index, value)}>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="約">
                              <span className="text-yellow-500">約</span>
                            </SelectItem>
                            <SelectItem value="O">
                              <span className="text-green-500">O</span>
                            </SelectItem>
                            <SelectItem value="X">
                              <span className="text-red-500">X</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>編輯預約</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                  時間
                                </Label>
                                <Input id="time" 
                                  value={appointment.time}
                                  onChange={(e) => handleEditAppointment(index, { ...appointment, time: e.target.value })}
                                  className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="package" className="text-right">
                                  方案
                                </Label>
                                <Input id="package"
                                  value={appointment.package}
                                  onChange={(e) => handleEditAppointment(index, { ...appointment, package: e.target.value })}
                                  className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="count" className="text-right">
                                  次數
                                </Label>
                                <Input id="count"
                                  value={appointment.count}
                                  onChange={(e) => handleEditAppointment(index, { ...appointment, count: e.target.value })}
                                  className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                  金額
                                </Label>
                                <Input id="amount"
                                  value={appointment.amount}
                                  onChange={(e) => handleEditAppointment(index, { ...appointment, amount: e.target.value })}
                                  className="col-span-3" />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => handleDeleteAppointment(index)} className="border-blue-600 text-blue-600 hover:bg-blue-50">刪除</Button>
                              <Button onClick={() => handleEditAppointment(index, appointment)} className="bg-blue-600 text-white hover:bg-blue-700">保存</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="available">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>時間</TableHead>
                    <TableHead>狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>14:00</TableCell>
                    <TableCell>可約</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>15:00</TableCell>
                    <TableCell>有約</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>16:00</TableCell>
                    <TableCell>可約</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>17:00</TableCell>
                    <TableCell>有約</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>18:00</TableCell>
                    <TableCell>可約</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={generateExcel} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <FileDown className="w-4 h-4 mr-2" />
              生成表格
            </Button>
            <Button variant="outline" onClick={sendNotification} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Send className="w-4 h-4 mr-2" />
              發送通知
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)
}