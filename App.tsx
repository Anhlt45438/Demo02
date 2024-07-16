import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  // Cập nhật công việc
  const addOrUpdateTodo = () => {
    if (editIndex !== null) {
      if (todos[editIndex].completed) {
        Alert.alert('Không thể sửa công việc đã hoàn thành');
        return;
      }
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, title, content } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      if (title == '') {
        Alert.alert('Vui lòng nhập tiêu đề công việc');
      } else if (content == '') {
        Alert.alert('Vui lòng nhập nội dung công việc');
      } else {
        setTodos([...todos, { title, content, completed: false }]);
        setTitle('');
        setContent('');
      }

    }
  };

  // Sửa công việc
  const editTodo = (index) => {
    if (todos[index].completed) {
      Alert.alert('Không thể chỉnh sửa công việc đã hoàn thành');
      return;
    } else {
      setTitle(todos[index].title);
      setContent(todos[index].content);
      setEditIndex(index);
    }

  };

  // Xóa công việc
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Đổi trạng thái công việc
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Tính công việc đã và chưa làm 
  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <Text style={{ fontSize: 18, color: 'black' }}>Đã hoàn thành: {completedCount}</Text>
      <Text style={styles.counter}>Chưa hoàn thành: {incompleteCount}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tiêu đề"
          value={title}
          onChangeText={setTitle}
          editable={editIndex === null || (editIndex !== null && !todos[editIndex].completed)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nội dung"
          value={content}
          onChangeText={setContent}
          editable={editIndex === null || (editIndex !== null && !todos[editIndex].completed)}
        />
        <TouchableOpacity style={styles.button} onPress={addOrUpdateTodo}>
          <Text style={styles.buttonText}>{editIndex !== null ? 'Sửa' : 'Thêm'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={[styles.todoText, item.completed && styles.completed]}>{item.title}</Text>
            <Text>{item.content}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => toggleComplete(index)}>
                <Text style={styles.toggleButton}>{item.completed ? 'Chưa xong' : 'Đã xong'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editTodo(index)}>
                <Text style={styles.editButton}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black'
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  todoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  toggleButton: {
    color: 'blue',
  },
  editButton: {
    color: 'orange',
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
