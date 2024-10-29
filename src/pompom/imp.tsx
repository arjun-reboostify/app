import React, { useState } from 'react';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Topic {
  id: number;
  name: string;
  subtasks: Subtask[];
}

const TopicLearner: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicName, setTopicName] = useState<string>('');

  const defaultSubtasks = [
    { id: 1, title: 'Watch 5 Videos', completed: false },
    { id: 2, title: 'Answer 10 Questions', completed: false },
    { id: 3, title: 'Ask 10 Questions', completed: false },
    { id: 4, title: 'Write Medium Post', completed: false },
  ];

  const addTopic = () => {
    if (!topicName.trim()) return;

    const newTopic: Topic = {
      id: Date.now(),
      name: topicName,
      subtasks: defaultSubtasks.map(subtask => ({ ...subtask, completed: false })),
    };

    setTopics([...topics, newTopic]);
    setTopicName('');
  };

  const toggleSubtask = (topicId: number, subtaskId: number) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === topicId
          ? {
              ...topic,
              subtasks: topic.subtasks.map(subtask =>
                subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
              ),
            }
          : topic
      )
    );
  };

  const removeTopic = (topicId: number) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
  };

  return (
    <div className="bg-gray-900  flex flex-col items-center p-6 font-sans">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Add Topics To Learn</h1>

      <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-6 mb-6">
        <input
          type="text"
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
          placeholder="Add a new topic"
          className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
        />
        <button
          onClick={addTopic}
          className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-2 rounded-lg transition duration-300"
        >
          Add Topic
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {topics.map(topic => (
          <div key={topic.id} className="bg-black rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">{topic.name}</h2>
              <button
                onClick={() => removeTopic(topic.id)}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                &times;
              </button>
            </div>

            <ul className="space-y-2">
              {topic.subtasks.map(subtask => (
                <li key={subtask.id} className="flex items-center justify-between">
                  <span
                    className={`${
                      subtask.completed ? 'line-through text-green-400' : 'text-green-700'
                    }`}
                  >
                    {subtask.title}
                  </span>
                  <button
                    onClick={() => toggleSubtask(topic.id, subtask.id)}
                    className={`${
                      subtask.completed
                        ? 'bg-green-400 text-black'
                        : 'bg-green-600 text-black hover:bg-green-700'
                    } px-3 py-1 rounded-full transition duration-300`}
                  >
                    {subtask.completed ? 'Undo' : 'Complete'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicLearner;
