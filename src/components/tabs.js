import axios from 'axios'

const Tabs = (topics) => {
  // Must use .textContent instead of .innerText!
  const container = document.createElement('div')
  container.classList.add('topics')
  topics.forEach(topic => {
    const tab = document.createElement('div')
    tab.classList.add('tab')
    tab.textContent = topic
    container.appendChild(tab)
  })
  return container
}

const tabsAppender = async (selector) => {
  const res = await axios.get('https://lambda-times-api.herokuapp.com/topics')
  const tabs = Tabs(res.data.topics)
  document.querySelector(selector).appendChild(tabs)
}

export { Tabs, tabsAppender }
