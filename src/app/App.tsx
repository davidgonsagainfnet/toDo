import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },
  imgTopo: {
    width: '100%',
    height: '20%',
  },
  item: {
    padding: 9,
    fontSize: 20,
    height: 44,
    borderBottomWidth: 0.5,
  },
  noData: {
    width: '100%',
    height: '50%',
  },
});

type Todo = {
  task: string;
};

export default function App() {
  const [isName, setIsName] = useState<string>('');
  const [toDo, setTodo] = useState<Todo[]>([
    {task: 'David'},
    {task: 'Pedro'},
    {task: 'Matheus'},
    {task: 'Amanda'},
    {task: 'Evelyn'},
    {task: 'Joel'},
    {task: 'John'},
    {task: 'Jillian'},
    {task: 'Jimmy'},
    {task: 'Julie'},
  ]);
  const [toDoTela, setTodoTela] = useState<Todo[]>([]);
  const [input, setInput] = React.useState('');
  const [tarefaVisible, setTarefaVisible] = React.useState(false);

  // let toDo = [{task: '', status: ''}];
  // const toDo = [
  //   {task: 'David'},
  //   {task: 'Pedro'},
  //   {task: 'Matheus'},
  //   {task: 'Amanda'},
  //   {task: 'Evelyn'},
  //   {task: 'Joel'},
  //   {task: 'John'},
  //   {task: 'Jillian'},
  //   {task: 'Jimmy'},
  //   {task: 'Julie'},
  // ];

  useEffect(() => {
    setTodoTela(toDo);
  }, []);

  useEffect(() => {
    if (isName.length >= 1) {
      const toDoToResult = toDo.filter(p => {
        if (!p.task.indexOf(isName)) {
          return p;
        }
      });
      setTodoTela(toDoToResult);
    } else {
      setTodoTela(toDo);
    }
  }, [isName]);

  useEffect(() => {
    if (typeof input !== undefined && input !== '') {
      const arrayTemp = [...toDo, {task: input}];
      setTodo(arrayTemp);
      setTodoTela(toDo);
    }
  }, [input]);

  return (
    <>
      <Image
        source={require('../image/topo.png')}
        style={styles.imgTopo}
        resizeMode={'stretch'}
      />
      <Button
        title="Adcionar Nova Tarefa"
        color="#841584"
        accessibilityLabel="Nova Tarefa"
        onPress={() => setTarefaVisible(true)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar"
        onChangeText={text => setIsName(text)}
      />

      {toDoTela.length === 0 ? (
        <Image source={require('../image/nodata.png')} style={styles.noData} />
      ) : null}

      <FlatList
        data={toDoTela}
        renderItem={({item}) => <Text style={styles.item}>{item.task}</Text>}
      />

      <DialogInput
        isDialogVisible={tarefaVisible}
        title={'Tarefa'}
        hintInput={'Digite aqui uma tarefa'}
        submitInput={(inputText: React.SetStateAction<string>) => {
          setInput(inputText), setTarefaVisible(false);
        }}
        closeDialog={() => setTarefaVisible(false)}
      />
    </>
  );
}
