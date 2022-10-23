import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
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
    borderBottomWidth: 2,
  },
  noData: {
    width: '100%',
    height: '50%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  buttonFazendo: {
    backgroundColor: '#FFD700',
  },
  buttonFaito: {
    backgroundColor: '#556B2F',
  },
  buttonApagar: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

type Todo = {
  id: number;
  task: string;
  status: string;
};

export default function App() {
  const [isName, setIsName] = useState<string>('');
  const [toDo, setTodo] = useState<Todo[]>([]);
  const [toDoTela, setTodoTela] = useState<Todo[]>([]);
  const [input, setInput] = React.useState('');
  const [tarefaVisible, setTarefaVisible] = React.useState(false);
  const [isModal, setIsModal] = React.useState(false);
  const [idTodo, setIdTodo] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTodoTela(toDo);
  }, []);

  useEffect(() => {
    if (isName.length >= 1) {
      const toDoToResult = toDo.filter(p => {
        if (p.task.includes(isName)) {
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
      const arrayTemp = [
        ...toDo,
        {id: toDo.length + 1, task: input, status: 'todo'},
      ];
      setTodo(arrayTemp);
      setTodoTela(arrayTemp);
    }
  }, [input]);

  function apagar() {
    const arrayApagar = toDo.filter(p => {
      return p.id !== idTodo;
    });
    setTodo(arrayApagar);
    setTodoTela(arrayApagar);
    setIsModal(false);
  }

  function tipoTarefa(tarefa: string) {
    let alterArray = toDo.map(p => {
      if (p.id === idTodo) {
        p.status = tarefa;
      }
      return p;
    });
    setTodo(alterArray);
    setTodoTela(alterArray);
    setIsModal(false);
  }

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

      {toDoTela?.length === 0 ? (
        <Image source={require('../image/nodata.png')} style={styles.noData} />
      ) : null}

      <FlatList
        data={toDoTela}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor:
                item.status === 'todo'
                  ? '#fff'
                  : item.status === 'completed'
                  ? '#ADFF2F'
                  : '#FFFF00',
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsModal(true);
                setIdTodo(item.id);
              }}>
              <Text style={styles.item}>{item.task}</Text>
            </TouchableOpacity>
          </View>
        )}
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

      <Modal animationType="slide" transparent={true} visible={isModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Escolha uma das Opções</Text>
            <Pressable
              style={[styles.button]}
              onPress={() => tipoTarefa('todo')}>
              <Text style={styles.textStyle}>A fazer</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonFazendo]}
              onPress={() => tipoTarefa('doing')}>
              <Text style={styles.textStyle}>Fazendo</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonFaito]}
              onPress={() => tipoTarefa('completed')}>
              <Text style={styles.textStyle}>Completado</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonApagar]}
              onPress={() => apagar()}>
              <Text style={styles.textStyle}>Apagar</Text>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={() => setIsModal(false)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
