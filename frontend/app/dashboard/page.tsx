"use client"

import React, { useState, useEffect } from 'react'
import { parseISO, format, subDays, addHours, eachDayOfInterval } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, BarChart, PieChart, ScatterChart, HeatMap } from "@/components/ui/charts"

// ... (previous imports and mock data generation)

export default function InsulinPumpAnalysis() {
  // ... (previous state declarations and useEffect)

  const [comparisonData, setComparisonData] = useState(null)

  // ... (previous chart data preparations)

  const hypoglycemiaScatterData = {
    datasets: [{
      label: 'Glykémie',
      data: filteredData.map(item => ({
        x: new Date(item.datetime).getTime(),
        y: item.glucoseLevel,
      })),
      backgroundColor: filteredData.map(item => 
        item.glucoseLevel < 3.9 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
      ),
    }],
  }

  const prepareHeatMapData = (data) => {
    const days = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
    const hours = Array.from({length: 24}, (_, i) => i)
    
    const heatmapData = days.map(() => new Array(24).fill(0))
    const counts = days.map(() => new Array(24).fill(0))

    data.forEach(item => {
      const date = new Date(item.datetime)
      const dayIndex = date.getDay()
      const hour = date.getHours()
      
      heatmapData[dayIndex][hour] += item.glucoseLevel
      counts[dayIndex][hour]++
    })

    // Calculate averages
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        if (counts[i][j] > 0) {
          heatmapData[i][j] /= counts[i][j]
        }
      }
    }

    return { data: heatmapData, xLabels: hours, yLabels: days }
  }

  const glucoseHeatMapData = prepareHeatMapData(filteredData)

  const fetchComparisonData = async () => {
    // In a real application, this would be an API call
    // For now, we'll just generate some mock data
    const previousPeriodStart = subDays(dateRange.start, 7)
    const previousPeriodEnd = subDays(dateRange.end, 7)
    const previousData = generateMockData(previousPeriodStart, 7)
    setComparisonData(processData(previousData))
  }

  const comparisonChartData = {
    labels: eachDayOfInterval({ start: dateRange.start, end: dateRange.end }).map(date => format(date, 'dd.MM.')),
    datasets: [
      {
        label: 'Aktuální období',
        data: filteredData.map(item => item.glucoseLevel),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Předchozí období',
        data: comparisonData ? comparisonData.map(item => item.glucoseLevel) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analýza inzulinové pumpy a CGM dat</h1>
      
      {/* ... (previous date range and export button) */}

      <Tabs defaultValue="overview" className="mb-4">
        <TabsList>
          <TabsTrigger value="overview">Přehled</TabsTrigger>
          <TabsTrigger value="detailed">Detailní analýza</TabsTrigger>
          <TabsTrigger value="patterns">Vzorce a predikce</TabsTrigger>
          <TabsTrigger value="comparison">Porovnání</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {/* ... (previous overview content) */}
        </TabsContent>
        <TabsContent value="detailed">
          {/* ... (previous detailed analysis content) */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Výskyt hypoglykémií</CardTitle>
              <CardDescription>Rozložení glykémie s označením hypoglykemických událostí</CardDescription>
            </CardHeader>
            <CardContent>
              <ScatterChart data={hypoglycemiaScatterData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patterns">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Heatmapa glykémie</CardTitle>
              <CardDescription>Průměrné hodnoty glykémie podle dne v týdnu a hodiny</CardDescription>
            </CardHeader>
            <CardContent>
              <HeatMap {...glucoseHeatMapData} />
            </CardContent>
          </Card>
          {/* ... (other pattern recognition and prediction charts) */}
        </TabsContent>
        <TabsContent value="comparison">
          <Button onClick={fetchComparisonData} className="mb-4">Načíst data pro porovnání</Button>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Porovnání glykémie s předchozím obdobím</CardTitle>
              <CardDescription>Průměrné hodnoty glykémie ve srovnání s předchozím týdnem</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={comparisonChartData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ... (rest of the component remains the same) */}
    </div>
  )
}
