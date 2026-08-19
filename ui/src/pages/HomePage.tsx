import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Board from "../components/Board"
import AddTaskModal, { type TaskFormInput, type EditingTask } from "../components/AddTaskModal"
import type { ColumnData, Task } from "../types/board"
import type { ColumnColor } from "../data/columnColors"
import { initialColumns } from "../data/tasks"

let nextColumnId = 1
let nextTaskId = 1

const HomePage = () => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [addTaskColumnId, setAddTaskColumnId] = useState<string | undefined>(undefined)
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleAddColumn = (name: string, dotVariant: ColumnColor) => {
    const newColumn: ColumnData = {
      id: `col-new-${nextColumnId++}`,
      name,
      dotVariant,
      tasks: [],
    }
    setColumns(prev => [...prev, newColumn])
  }

  const handleOpenAddTask = (columnId?: string) => {
    setEditingTask(null)
    setAddTaskColumnId(columnId)
    setIsTaskModalOpen(true)
  }

  useEffect(() => {
    const state = location.state as { openAddTask?: boolean } | null
    if (state?.openAddTask) {
      handleOpenAddTask()
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.state])

  const handleOpenEditTask = (task: Task, columnId: string) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      tags: task.tags,
      columnId,
    })
    setIsTaskModalOpen(true)
  }

  const handleConfirmTask = (input: TaskFormInput) => {
    if (input.taskId) {
      const taskId = input.taskId
      setColumns(prev => {
        const fromColumn = prev.find(column => column.tasks.some(t => t.id === taskId))
        const existingTask = fromColumn?.tasks.find(t => t.id === taskId)
        if (!existingTask) return prev

        const updatedTask: Task = {
          ...existingTask,
          title: input.title,
          description: input.description,
          tags: input.tags,
        }

        return prev.map(column => {
          if (column.id === fromColumn!.id && column.id !== input.columnId) {
            return { ...column, tasks: column.tasks.filter(t => t.id !== taskId) }
          }
          if (column.id === input.columnId) {
            const tasks = column.id === fromColumn!.id
              ? column.tasks.map(t => (t.id === taskId ? updatedTask : t))
              : [...column.tasks, updatedTask]
            return { ...column, tasks }
          }
          return column
        })
      })
    } else {
      const id = `TSK-${100 + nextTaskId++}`
      const newTask: Task = {
        id,
        title: input.title,
        description: input.description,
        tags: input.tags,
        ref: id,
        date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      }

      setColumns(prev =>
        prev.map(column =>
          column.id === input.columnId
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        )
      )
    }

    setIsTaskModalOpen(false)
  }

  const handleEditColumn = (columnId: string, name: string, dotVariant: ColumnData["dotVariant"]) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId ? { ...column, name, dotVariant } : column
      )
    )
  }

  const handleMoveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
    if (fromColumnId === toColumnId) return

    setColumns(prev => {
      const task = prev.find(column => column.id === fromColumnId)?.tasks.find(t => t.id === taskId)
      if (!task) return prev

      return prev.map(column => {
        if (column.id === fromColumnId) {
          return { ...column, tasks: column.tasks.filter(t => t.id !== taskId) }
        }
        if (column.id === toColumnId) {
          return { ...column, tasks: [...column.tasks, task] }
        }
        return column
      })
    })
  }

  return (
    <div>
      <Header onNewTaskClick={() => handleOpenAddTask()} />
      <h1 className="welcome-heading">Hello, John</h1>
      <Board
        columns={columns}
        onAddColumn={handleAddColumn}
        onOpenAddTask={handleOpenAddTask}
        onMoveTask={handleMoveTask}
        onEditTask={handleOpenEditTask}
        onEditColumn={handleEditColumn}
      />

      <AddTaskModal
        isOpen={isTaskModalOpen}
        columns={columns.map(column => ({ id: column.id, name: column.name }))}
        initialColumnId={addTaskColumnId}
        editingTask={editingTask}
        onConfirm={handleConfirmTask}
        onCancel={() => setIsTaskModalOpen(false)}
      />
    </div>
  )
}

export default HomePage
