import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

class MyTasks extends Component {
  state = {activeTag: '', task: '', tag: 'Health', userAddedTasks: []}

  userEnteredTask = event => {
    this.setState({task: event.target.value})
  }

  selectedTag = event => {
    const selectedTag =
      event.target.value[0] +
      event.target.value.slice(1, event.target.value.length).toLowerCase()
    this.setState({tag: selectedTag})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const newTask = {task, tag, id: uuidv4()}
    if (task.length > 0) {
      this.setState(prevState => ({
        userAddedTasks: [...prevState.userAddedTasks, newTask],
        task: '',
      }))
    }
  }

  onClickTag = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? '' : id,
    }))
  }

  render() {
    const {tagLists} = this.props
    const {task, userAddedTasks, activeTag} = this.state
    const filteredTasks = userAddedTasks.filter(each => each.tag === activeTag)
    const displayTasks = activeTag.length > 0 ? filteredTasks : userAddedTasks
    return (
      <div className="my-task-main-container">
        {/* input task */}

        <div className="task-form-container">
          <form className="task-form" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Create a task!</h1>
            <div className="form-task-input">
              <label htmlFor="text">Task</label>
              <input
                onChange={this.userEnteredTask}
                id="text"
                type="text"
                placeholder="Enter the task here"
                value={task}
              />
            </div>
            <div className="form-task-input">
              <label htmlFor="tags">Tags</label>
              <select onChange={this.selectedTag} id="tags">
                {tagLists.map(tag => (
                  <option key={tag.optionId} value={tag.optionId}>
                    {tag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>

        {/* display tasks */}

        <div className="display-tasks-main-container">
          <div className="display-tags-main-container">
            <h1>Tags</h1>
            <ul>
              {tagLists.map(tag => (
                <li key={tag.optionId}>
                  <button
                    className={
                      activeTag === tag.displayText
                        ? 'button active-tag'
                        : 'button un-active-tag'
                    }
                    onClick={() => this.onClickTag(tag.displayText)}
                    type="button"
                  >
                    {tag.displayText}
                  </button>
                </li>
              ))}
            </ul>
            <h1>Tasks</h1>
          </div>

          {displayTasks.length > 0 ? (
            <ul className="display-tasks">
              {displayTasks.map(eachTask => (
                <li key={eachTask.id}>
                  <p className="task">{eachTask.task}</p>
                  <p className="tag">{eachTask.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-tasks-added-yet">
              <p>No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default MyTasks
