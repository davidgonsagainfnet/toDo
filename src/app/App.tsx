import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
} from 'react-native';

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
  key: string;
};

export default function App() {
  const [isName, setIsName] = useState<string>('');
  const [toDoTela, setTodoTela] = useState<Todo[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let toDo = [
    {key: 'David'},
    {key: 'Pedro'},
    {key: 'Matheus'},
    {key: 'Amanda'},
    {key: 'Evelyn'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ];

  useEffect(() => {
    setTodoTela(toDo);
  }, []);

  useEffect(() => {
    if (isName.length >= 1) {
      const toDoToResult = toDo.filter(p => {
        if (!p.key.indexOf(isName)) {
          return p;
        }
      });
      setTodoTela(toDoToResult);
    } else {
      setTodoTela(toDo);
    }
  }, [isName]);

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
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </>
  );
}
