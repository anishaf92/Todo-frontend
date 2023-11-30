const DB_NAME = 'todoDatabase';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'todos';

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  });
};

export const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['todos'], 'readonly');
        const objectStore = transaction.objectStore('todos');

        const getRequest = objectStore.getAll();

        getRequest.onsuccess = function () {
          const todos = getRequest.result;

          const sortedTodos = todos.sort((a, b) => {
            
            const completedStatusDiff = a.completed - b.completed;

            if (completedStatusDiff !== 0) {
              return completedStatusDiff;
            }

           
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;

            return dateA - dateB;
          });
          console.log(sortedTodos)

          resolve(sortedTodos);
        };

        getRequest.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });

};

export const addTodo = (newTodo) => {
    return new Promise((resolve, reject) => {
      openDatabase()
        .then((db) => {
          const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
  
          const addRequest = objectStore.add(newTodo);
  
          addRequest.onsuccess = function () {
            resolve();
          };
  
          addRequest.onerror = function (event) {
            reject(event.target.error);
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
export const deleteTodo = (todoId) => {
    return new Promise((resolve, reject) => {
      openDatabase()
        .then((db) => {
          const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
  
          const deleteRequest = objectStore.delete(todoId);
  
          deleteRequest.onsuccess = function () {
            resolve();
          };
  
          deleteRequest.onerror = function (event) {
            reject(event.target.error);
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
};
  
export const updateTodoPriority = (todoId, newPriority) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['todos'], 'readwrite');
        const objectStore = transaction.objectStore('todos');

        const getRequest = objectStore.get(todoId);

        getRequest.onsuccess = function () {
          const todo = getRequest.result;

          // Update the priority
          todo.priority = newPriority;

          // Put the updated todo back into the object store
          const putRequest = objectStore.put(todo);

          putRequest.onsuccess = function () {
            resolve();
          };

          putRequest.onerror = function (event) {
            reject(event.target.error);
          };
        };

        getRequest.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTodoById = (id) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['todos'], 'readonly');
        const objectStore = transaction.objectStore('todos');

        const getRequest = objectStore.get(id);
        console.log(getRequest)

        getRequest.onsuccess = function () {
          const todo = getRequest.result;
          console.log(todo)
          resolve(todo);
        };

        getRequest.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const updateTodo = (id, priority, completed) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['todos'], 'readwrite');
        const objectStore = transaction.objectStore('todos');

        const getRequest = objectStore.get(id);

        getRequest.onsuccess = function () {
          const todo = getRequest.result;

          todo.priority = priority;
          todo.completed = completed; // Add this line to update completion status

          const updateRequest = objectStore.put(todo);

          updateRequest.onsuccess = function () {
            resolve();
          };

          updateRequest.onerror = function (event) {
            reject(event.target.error);
          };
        };

        getRequest.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export const addCommentToTodo = (todoId, comment) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(['todos'], 'readwrite');
        const objectStore = transaction.objectStore('todos');

        const getRequest = objectStore.get(todoId);

        getRequest.onsuccess = function () {
          const todo = getRequest.result;

          // Check if the todo already has a 'comments' array
          if (!todo.comments) {
            todo.comments = [];
          }

          // Add the new comment to the 'comments' array
          todo.comments.push(comment);

          // Update the todo in the object store
          const updateRequest = objectStore.put(todo);

          updateRequest.onsuccess = function () {
            resolve();
          };

          updateRequest.onerror = function (event) {
            reject(event.target.error);
          };
        };

        getRequest.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};
