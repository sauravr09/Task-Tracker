
type Task = {
  id: string
  title: string
  description: string
  tags: { label: string; variant: string }[]
  ref: string
  date: string
}

type ColumnProps = {
  name: string
  count: number
  dotVariant?: "neutral" | "active" | "review" | "done"
  tasks: Task[]
  onAddTask?: () => void
}

const Column = ({ name, count, dotVariant = "neutral", tasks, onAddTask }: ColumnProps) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-heading">
          <span className={`column-dot ${dotVariant}`} />
          <span className="column-title">{name}</span>
          <span className="column-count">{count}</span>
        </div>
        <div className="column-header-actions">
          <button className="icon-btn" aria-label="Add task">+</button>
          <button className="icon-btn" aria-label="Column options">···</button>
        </div>
      </div>

      <div className="column-body">
        {tasks.map(task => (
          <div className="card" key={task.id}>
            <div className="card-title-row">
              <span className="card-drag-handle">≡</span>
              <span className="card-title">{task.title}</span>
            </div>
            <p className="card-description">{task.description}</p>
            <div className="card-tags">
              {task.tags.map(tag => (
                <span key={tag.label} className={`tag tag-${tag.variant}`}>
                  <span className="tag-dot" />
                  {tag.label}
                </span>
              ))}
            </div>
            <div className="card-divider" />
            <div className="card-footer">
              <span className="card-meta">{task.ref} · {task.date}</span>
              <div className="card-footer-actions">
                <button className="move-to-btn">Move to...</button>
                <button className="icon-btn" aria-label="Edit">✏️</button>
                <button className="icon-btn" aria-label="Remove">×</button>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="column-empty">
            <p>No tasks yet</p>
            <button className="add-a-task-link" onClick={onAddTask}>Add a task</button>
          </div>
        )}
      </div>

      <button className="add-task-btn" onClick={onAddTask}>+ Add task</button>
    </div>
  )
}

export default Column