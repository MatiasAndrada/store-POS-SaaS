"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardTienda() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Control</h2>
      </div>
      <Tabs aria-label="Opciones">
        <Tab key="resumen" title="Resumen">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody>
                <p className="text-sm font-medium">Ventas Totales</p>
                <p className="text-2xl font-bold">$45,231.89</p>
                <p className="text-xs text-gray-500">
                  +20.1% desde el mes pasado
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium">Beneficio Total</p>
                <p className="text-2xl font-bold">$12,234.56</p>
                <p className="text-xs text-gray-500">
                  +15.2% desde el mes pasado
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium">Clientes Totales</p>
                <p className="text-2xl font-bold">2,350</p>
                <p className="text-xs text-gray-500">+180 nuevos clientes</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium">Estado del Inventario</p>
                <p className="text-2xl font-bold">1,234 artículos</p>
                <p className="text-xs text-gray-500">
                  20 artículos con poco stock
                </p>
              </CardBody>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <h3 className="text-xl font-semibold">Tendencia de Ventas</h3>
              </CardHeader>
              <CardBody>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosVentas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nombre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ventas"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <h3 className="text-xl font-semibold">Ventas por Categoría</h3>
              </CardHeader>
              <CardBody>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={datosCategorias}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {datosCategorias.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORES[index % COLORES.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Productos Más Vendidos
                </h3>
              </CardHeader>
              <CardBody>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datosProductosTop}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nombre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ventas" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Rendimiento de Empleados
                </h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Tabla de rendimiento de empleados">
                  <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>VENTAS</TableColumn>
                    <TableColumn>TRANSACCIONES</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {datosEmpleados.map((empleado) => (
                      <TableRow key={empleado.nombre}>
                        <TableCell>{empleado.nombre}</TableCell>
                        <TableCell>${empleado.ventas}</TableCell>
                        <TableCell>{empleado.transacciones}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Tab>
        <Tab key="analiticas" title="Analíticas">
          <div className="text-center p-4">
            <p>Contenido de Analíticas en desarrollo</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
export const datosVentas = [
  { nombre: "Ene", ventas: 4000 },
  { nombre: "Feb", ventas: 3000 },
  { nombre: "Mar", ventas: 5000 },
  { nombre: "Abr", ventas: 4500 },
  { nombre: "May", ventas: 6000 },
  { nombre: "Jun", ventas: 5500 },
];

export const datosCategorias = [
  { nombre: "Electrónicos", valor: 400 },
  { nombre: "Ropa", valor: 300 },
  { nombre: "Alimentos", valor: 300 },
  { nombre: "Libros", valor: 200 },
];

export const datosProductosTop = [
  { nombre: "Producto A", ventas: 120 },
  { nombre: "Producto B", ventas: 80 },
  { nombre: "Producto C", ventas: 70 },
  { nombre: "Producto D", ventas: 60 },
  { nombre: "Producto E", ventas: 50 },
];

export const datosEmpleados = [
  { nombre: "Juan Pérez", ventas: 1200, transacciones: 150 },
  { nombre: "María García", ventas: 1000, transacciones: 120 },
  { nombre: "Carlos Rodríguez", ventas: 800, transacciones: 100 },
  { nombre: "Ana Martínez", ventas: 900, transacciones: 110 },
];

export const COLORES = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
