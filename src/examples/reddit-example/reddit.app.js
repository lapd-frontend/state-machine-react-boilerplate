import React from 'react'
import { useMachine } from '@xstate/react'
import { redditMachine } from './machine/redditMachine'

const subreddits = ['frontend', 'reactjs', 'vuejs']

const RedditApp = () => {
  const [current, send] = useMachine(redditMachine)
  const { subreddit, posts } = current.context

  return (
    <main>
      <header>
        <select
          onChange={e => {
            send('SELECT', { name: e.target.value })
          }}
        >
          {subreddits.map(subreddit => {
            return <option key={subreddit}>{subreddit}</option>
          })}
        </select>
      </header>
      <div>
        <h1>{current.matches('idle') ? 'Select a subreddit' : subreddit}</h1>
        {current.matches({ selected: 'loading' }) && <div>Loading...</div>}
        {current.matches({ selected: 'loaded'}) && (
          <ul>
            {posts.map(post => (
              <li key={post.title}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}