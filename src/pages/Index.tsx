import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Discipline {
  id: string;
  name: string;
  course: number;
  hours: number;
  direction: string;
}

interface LessonPlan {
  id: string;
  disciplineId: string;
  topic: string;
  hours: number;
  date: string;
  status: 'draft' | 'completed';
}

interface Template {
  id: string;
  name: string;
  type: string;
  hours: number;
}

const Index = () => {
  const [disciplines] = useState<Discipline[]>([
    { id: '1', name: 'Тактика', course: 3, hours: 144, direction: 'Командная подготовка' },
    { id: '2', name: 'Огневая подготовка', course: 2, hours: 108, direction: 'Боевая подготовка' },
    { id: '3', name: 'Военная топография', course: 1, hours: 72, direction: 'Специальная подготовка' },
  ]);

  const [lessonPlans] = useState<LessonPlan[]>([
    { id: '1', disciplineId: '1', topic: 'Боевой порядок взвода в наступлении', hours: 4, date: '2025-11-10', status: 'completed' },
    { id: '2', disciplineId: '2', topic: 'Стрельба из автомата', hours: 2, date: '2025-11-15', status: 'draft' },
    { id: '3', disciplineId: '3', topic: 'Ориентирование на местности', hours: 3, date: '2025-11-20', status: 'draft' },
  ]);

  const [templates] = useState<Template[]>([
    { id: '1', name: 'Лекция', type: 'Теория', hours: 2 },
    { id: '2', name: 'Практическое занятие', type: 'Практика', hours: 4 },
    { id: '3', name: 'Лабораторная работа', type: 'Лаборатория', hours: 4 },
  ]);

  const [newPlan, setNewPlan] = useState({
    topic: '',
    disciplineId: '',
    hours: '',
    introduction: '',
    formation: '',
    control: '',
    reflection: ''
  });

  const stats = {
    totalDisciplines: disciplines.length,
    totalPlans: lessonPlans.length,
    completedPlans: lessonPlans.filter(p => p.status === 'completed').length,
    totalHours: disciplines.reduce((sum, d) => sum + d.hours, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">EduPlan</h1>
                <p className="text-sm text-slate-600">Платформа планирования занятий</p>
              </div>
            </div>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Новый план
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Дисциплины</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-slate-900">{stats.totalDisciplines}</div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon name="BookOpen" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Планов занятий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-slate-900">{stats.totalPlans}</div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <Icon name="FileText" className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Завершено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-slate-900">{stats.completedPlans}</div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Всего часов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-slate-900">{stats.totalHours}</div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Icon name="Clock" className="text-orange-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="plans" className="gap-2">
              <Icon name="Calendar" size={16} />
              Планы занятий
            </TabsTrigger>
            <TabsTrigger value="disciplines" className="gap-2">
              <Icon name="BookOpen" size={16} />
              Дисциплины
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <Icon name="Layout" size={16} />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="constructor" className="gap-2">
              <Icon name="FileEdit" size={16} />
              Конструктор
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            {lessonPlans.map((plan) => {
              const discipline = disciplines.find(d => d.id === plan.disciplineId);
              return (
                <Card key={plan.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{plan.topic}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Icon name="BookOpen" size={14} />
                            {discipline?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {plan.hours} ч
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {new Date(plan.date).toLocaleDateString('ru-RU')}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant={plan.status === 'completed' ? 'default' : 'secondary'}>
                        {plan.status === 'completed' ? 'Завершён' : 'Черновик'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="Edit" size={14} />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="Eye" size={14} />
                        Просмотр
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="disciplines" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disciplines.map((discipline) => (
                <Card key={discipline.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base">{discipline.name}</CardTitle>
                    <CardDescription>{discipline.direction}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Курс обучения</span>
                      <Badge variant="outline">{discipline.course} курс</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Трудоёмкость</span>
                      <span className="font-semibold">{discipline.hours} ч</span>
                    </div>
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Icon name="FileText" className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription>{template.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <Icon name="Clock" size={14} />
                      {template.hours} часа
                    </div>
                    <Button variant="default" className="w-full" size="sm">
                      Использовать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="constructor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Конструктор плана занятия</CardTitle>
                <CardDescription>Создайте структурированный план учебного занятия</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Тема занятия</Label>
                    <Input
                      id="topic"
                      placeholder="Введите тему занятия"
                      value={newPlan.topic}
                      onChange={(e) => setNewPlan({ ...newPlan, topic: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discipline">Дисциплина</Label>
                    <Select
                      value={newPlan.disciplineId}
                      onValueChange={(value) => setNewPlan({ ...newPlan, disciplineId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите дисциплину" />
                      </SelectTrigger>
                      <SelectContent>
                        {disciplines.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Количество часов</Label>
                    <Input
                      id="hours"
                      type="number"
                      placeholder="2"
                      value={newPlan.hours}
                      onChange={(e) => setNewPlan({ ...newPlan, hours: e.target.value })}
                    />
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="introduction">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon name="Play" size={18} />
                        1. Введение (вовлечение)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Деятельность обучающихся</Label>
                        <Textarea
                          placeholder="Опишите активности обучающихся на этапе введения"
                          value={newPlan.introduction}
                          onChange={(e) => setNewPlan({ ...newPlan, introduction: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="formation">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon name="Layers" size={18} />
                        2. Формирование (изучить/исследовать/создать)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Деятельность обучающихся</Label>
                        <Textarea
                          placeholder="Опишите активности обучающихся на этапе формирования"
                          value={newPlan.formation}
                          onChange={(e) => setNewPlan({ ...newPlan, formation: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="control">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckSquare" size={18} />
                        3. Контроль
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Форма контроля</Label>
                        <Textarea
                          placeholder="Опишите форму контроля и критерии оценивания"
                          value={newPlan.control}
                          onChange={(e) => setNewPlan({ ...newPlan, control: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reflection">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon name="MessageSquare" size={18} />
                        4. Рефлексия (анализ/оценка)
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Деятельность обучающихся</Label>
                        <Textarea
                          placeholder="Опишите рефлексивную деятельность обучающихся"
                          value={newPlan.reflection}
                          onChange={(e) => setNewPlan({ ...newPlan, reflection: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-3 pt-4">
                  <Button className="gap-2">
                    <Icon name="Save" size={18} />
                    Сохранить план
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Eye" size={18} />
                    Предпросмотр
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
