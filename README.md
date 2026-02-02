# TodoList App

[🇵🇹 Português](#portugues) | [🇬🇧 English](#english)

---

## <a id="portugues">🇵🇹 PORTUGUÊS</a>

# TodoList App

Uma aplicação de lista de tarefas moderna e responsiva, construída com React, TypeScript e Tailwind CSS. A aplicação permite criar, gerenciar e organizar suas tarefas com suporte a diferentes temas.

## 🚀 Funcionalidades

- **Criar Tarefas**: Adicione novas tarefas através de um formulário simples
- **Marcar como Concluído**: Toggle para marcar tarefas como completas ou ativas
- **Remover Tarefas**: Delete tarefas individuais da lista
- **Filtrar Tarefas**: Visualize todas as tarefas, apenas as ativas ou apenas as concluídas
- **Limpar Concluídas**: Remove todas as tarefas concluídas de uma vez
- **Persistência de Dados**: Todas as tarefas são salvas no Local Storage do navegador
- **Temas Dinâmicos**: Alterne entre tema claro e escuro com a preferência salva automaticamente
- **Interface Responsiva**: Design otimizado para todos os tamanhos de tela

## 🛠️ Tecnologias Utilizadas

- **React 19.1**: Framework JavaScript para construir a interface
- **TypeScript**: Tipagem estática para melhor segurança e manutenibilidade
- **Tailwind CSS 4.1**: Framework CSS utilitário para estilização
- **Vite**: Build tool rápido e moderno
- **React Context API**: Gerenciamento de estado global para temas


## 🎨 Sistema de Temas com Context API

O projeto utiliza **React Context API** para gerenciar os temas de forma centralizada e eficiente.

### Como Funciona:

#### 1. **ThemeContext** ([src/contexts/ThemeContext.ts](src/contexts/ThemeContext.ts))
Define a interface e cria o contexto:

```typescript
interface ThemeContextType {
    theme: ThemeName;        // Tema atual: "light" ou "dark"
    toggleTheme: () => void; // Função para alternar tema
}

export const ThemeContext = createContext<ThemeContextType>({...});
```

#### 2. **ThemeProvider** ([src/contexts/ThemeProvider.tsx](src/contexts/ThemeProvider.tsx))
Gerencia o estado do tema e persiste no Local Storage:

```typescript
const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeName>(() => {
        // Carrega tema do Local Storage ou usa "dark" como padrão
        const themeFromLocalStorage = localStorage.getItem("@todoList: theme");
        return themeFromLocalStorage ? JSON.parse(themeFromLocalStorage) : "dark";
    });

    useEffect(() => {
        // Salva tema no Local Storage sempre que muda
        localStorage.setItem("@todoList: theme", JSON.stringify(theme));
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
```

**Principais características:**
- Estado centralizado para tema
- Persistência automática via Local Storage
- Função `toggleTheme()` para alternar entre claro e escuro
- Context Provider para distribuir estado globalmente

#### 3. **Configuração de Cores** ([src/contexts/theme.ts](src/contexts/theme.ts))
Define as cores e estilos para cada tema:

```typescript
export const themeConfig = {
    light: {
        layout: { backgroundColor: 'bg-light-purple-300', ... },
        todo: { backgroundColor: 'bg-light-gray-50', ... },
        icon: IconMoon
    },
    dark: {
        layout: { backgroundColor: 'bg-dark-navy-950', ... },
        todo: { backgroundColor: 'bg-dark-navy-900', ... },
        icon: IconSun
    }
}
```

#### 4. **Consumindo o Contexto**
Os componentes acessam o tema usando o hook `useContext`:

```typescript
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

// Dentro do componente
const { theme, toggleTheme } = useContext(ThemeContext);

// Usar theme para aplicar estilos
// Usar toggleTheme() para mudar o tema
```

## 🎯 Hook Customizado: useTodo

O hook [useTodo](src/hooks/useTodo.ts) centraliza toda a lógica de gerenciamento de tarefas, tornando o código mais organizado e reutilizável.

### Interface Todo

```typescript
export interface Todo {
    id: number;        // ID único baseado em timestamp
    text: string;      // Texto da tarefa
    completed: boolean; // Status de conclusão
}
```

### Funcionalidades do Hook

#### **1. Persistência no Local Storage**
```typescript
const localStorageKey = "@todoList: list";

const [todolist, setTodolist] = useState<Todo[]>(() => {
    const todoListFromLocalStorage = localStorage.getItem(localStorageKey);
    return todoListFromLocalStorage ? JSON.parse(todoListFromLocalStorage) : [];
});

useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todolist));
}, [todolist]);
```
- Carrega tarefas do Local Storage ao inicializar
- Salva automaticamente quando a lista muda

#### **2. Adicionar Tarefa**
```typescript
const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const todoItem = formData.get("todo") as string;
    
    if (!todoItem.trim()) return;
    
    setTodolist(prev => [...prev, {
        id: Date.now(),
        text: todoItem,
        completed: false
    }]);
    
    event.currentTarget.reset();
    setFilter("all");
}
```
- Extrai dados do formulário
- Valida se a tarefa não está vazia
- Cria ID único usando timestamp
- Reseta o formulário após adicionar
- Volta para filtro "all"

#### **3. Marcar como Concluído**
```typescript
const toggleTodoCompleted = (id: number) => {
    const newTodoList = todolist.map(todo => {
        if (id === todo.id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    setTodolist(newTodoList);
}
```
- Inverte o estado `completed` da tarefa
- Mantém imutabilidade do estado

#### **4. Filtrar Tarefas**
```typescript
const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

const filteredTodos = todolist.filter(todo => {
    switch (filter) {
        case "all": return true;
        case "active": return !todo.completed;
        case "completed": return todo.completed;
    }
});
```
- Estado de filtro: "all", "active" ou "completed"
- `filteredTodos` contém a lista filtrada dinamicamente

#### **5. Remover Tarefa**
```typescript
const removeTodo = (id: number) => {
    setTodolist(prev => prev.filter(todo => todo.id !== id));
}
```
- Remove tarefa específica por ID

#### **6. Limpar Concluídas**
```typescript
const clearCompleted = () => {
    setTodolist(prev => prev.filter(todo => !todo.completed));
}
```
- Remove todas as tarefas marcadas como concluídas


## 📦 Instalação e Uso

### Instalar Dependências
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Lint do Código
```bash
npm run lint
```

## 🌐 Deploy

O projeto está configurado para deploy com GitHub Pages:

```bash
npm run deploy
```

Este comando executa:
1. `npm run build` - Cria a versão otimizada
2. Faz upload para a branch `gh-pages`

## 💾 Local Storage

A aplicação armazena duas informações no Local Storage:

1. **Tarefas**: Chave `@todoList: list`
   - Salva toda a lista de tarefas em JSON

2. **Tema**: Chave `@todoList: theme`
   - Salva a preferência de tema ("light" ou "dark")

## 🎓 Padrões e Conceitos Utilizados

- **Custom Hooks**: Isolamento da lógica em hooks reutilizáveis
- **React Context API**: Gerenciamento de estado global sem dependências externas
- **Local Storage API**: Persistência de dados no navegador
- **TypeScript**: Tipagem segura de interfaces e componentes
- **Functional Components**: Uso de componentes funcionais com Hooks
- **Controlled Components**: Componentes controlados pelos estados React

## 📝 Licença

Este projeto é de código aberto e livre para uso pessoal e educacional.

---

## <a id="english">🇬🇧 ENGLISH</a>

# TodoList App

A modern and responsive task list application, built with React, TypeScript, and Tailwind CSS. The application allows you to create, manage, and organize your tasks with support for different themes.

## 🚀 Features

- **Create Tasks**: Add new tasks through a simple form
- **Mark as Completed**: Toggle to mark tasks as complete or active
- **Remove Tasks**: Delete individual tasks from the list
- **Filter Tasks**: View all tasks, only active ones, or only completed ones
- **Clear Completed**: Remove all completed tasks at once
- **Data Persistence**: All tasks are saved in the browser's Local Storage
- **Dynamic Themes**: Switch between light and dark themes with automatically saved preference
- **Responsive Interface**: Design optimized for all screen sizes

## 🛠️ Technologies Used

- **React 19.1**: JavaScript framework for building the interface
- **TypeScript**: Static typing for better security and maintainability
- **Tailwind CSS 4.1**: Utility CSS framework for styling
- **Vite**: Fast and modern build tool
- **React Context API**: Global state management for themes

## 🎨 Theme System with Context API

The project uses **React Context API** to manage themes in a centralized and efficient way.

### How It Works:

#### 1. **ThemeContext** ([src/contexts/ThemeContext.ts](src/contexts/ThemeContext.ts))
Defines the interface and creates the context:

```typescript
interface ThemeContextType {
    theme: ThemeName;        // Current theme: "light" or "dark"
    toggleTheme: () => void; // Function to toggle theme
}

export const ThemeContext = createContext<ThemeContextType>({...});
```

#### 2. **ThemeProvider** ([src/contexts/ThemeProvider.tsx](src/contexts/ThemeProvider.tsx))
Manages the theme state and persists to Local Storage:

```typescript
const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeName>(() => {
        // Loads theme from Local Storage or uses "dark" as default
        const themeFromLocalStorage = localStorage.getItem("@todoList: theme");
        return themeFromLocalStorage ? JSON.parse(themeFromLocalStorage) : "dark";
    });

    useEffect(() => {
        // Saves theme to Local Storage whenever it changes
        localStorage.setItem("@todoList: theme", JSON.stringify(theme));
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
```

**Key characteristics:**
- Centralized state for theme
- Automatic persistence via Local Storage
- `toggleTheme()` function to switch between light and dark
- Context Provider to distribute state globally

#### 3. **Color Configuration** ([src/contexts/theme.ts](src/contexts/theme.ts))
Defines colors and styles for each theme:

```typescript
export const themeConfig = {
    light: {
        layout: { backgroundColor: 'bg-light-purple-300', ... },
        todo: { backgroundColor: 'bg-light-gray-50', ... },
        icon: IconMoon
    },
    dark: {
        layout: { backgroundColor: 'bg-dark-navy-950', ... },
        todo: { backgroundColor: 'bg-dark-navy-900', ... },
        icon: IconSun
    }
}
```

#### 4. **Consuming the Context**
Components access the theme using the `useContext` hook:

```typescript
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

// Inside the component
const { theme, toggleTheme } = useContext(ThemeContext);

// Use theme to apply styles
// Use toggleTheme() to change the theme
```

## 🎯 Custom Hook: useTodo

The [useTodo](src/hooks/useTodo.ts) hook centralizes all task management logic, making the code more organized and reusable.

### Todo Interface

```typescript
export interface Todo {
    id: number;        // Unique ID based on timestamp
    text: string;      // Task text
    completed: boolean; // Completion status
}
```

### Hook Features

#### **1. Local Storage Persistence**
```typescript
const localStorageKey = "@todoList: list";

const [todolist, setTodolist] = useState<Todo[]>(() => {
    const todoListFromLocalStorage = localStorage.getItem(localStorageKey);
    return todoListFromLocalStorage ? JSON.parse(todoListFromLocalStorage) : [];
});

useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todolist));
}, [todolist]);
```
- Loads tasks from Local Storage on initialization
- Automatically saves when the list changes

#### **2. Add Task**
```typescript
const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const todoItem = formData.get("todo") as string;
    
    if (!todoItem.trim()) return;
    
    setTodolist(prev => [...prev, {
        id: Date.now(),
        text: todoItem,
        completed: false
    }]);
    
    event.currentTarget.reset();
    setFilter("all");
}
```
- Extracts data from the form
- Validates if the task is not empty
- Creates unique ID using timestamp
- Resets the form after adding
- Returns to "all" filter

#### **3. Mark as Completed**
```typescript
const toggleTodoCompleted = (id: number) => {
    const newTodoList = todolist.map(todo => {
        if (id === todo.id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    setTodolist(newTodoList);
}
```
- Inverts the `completed` state of the task
- Maintains state immutability

#### **4. Filter Tasks**
```typescript
const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

const filteredTodos = todolist.filter(todo => {
    switch (filter) {
        case "all": return true;
        case "active": return !todo.completed;
        case "completed": return todo.completed;
    }
});
```
- Filter state: "all", "active", or "completed"
- `filteredTodos` contains the dynamically filtered list

#### **5. Remove Task**
```typescript
const removeTodo = (id: number) => {
    setTodolist(prev => prev.filter(todo => todo.id !== id));
}
```
- Removes specific task by ID

#### **6. Clear Completed**
```typescript
const clearCompleted = () => {
    setTodolist(prev => prev.filter(todo => !todo.completed));
}
```
- Removes all tasks marked as completed


## 📦 Installation and Usage

### Install Dependencies
```bash
npm install
```

### Run in Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview the Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🌐 Deployment

The project is configured for deployment with GitHub Pages:

```bash
npm run deploy
```

This command executes:
1. `npm run build` - Creates the optimized version
2. Uploads to the `gh-pages` branch

## 💾 Local Storage

The application stores two pieces of information in Local Storage:

1. **Tasks**: Key `@todoList: list`
   - Saves the entire task list in JSON

2. **Theme**: Key `@todoList: theme`
   - Saves the theme preference ("light" or "dark")

## 🎓 Patterns and Concepts Used

- **Custom Hooks**: Isolation of logic in reusable hooks
- **React Context API**: Global state management without external dependencies
- **Local Storage API**: Data persistence in the browser
- **TypeScript**: Safe typing of interfaces and components
- **Functional Components**: Use of functional components with Hooks
- **Controlled Components**: Components controlled by React states

## 📝 License

This project is open source and free for personal and educational use.
