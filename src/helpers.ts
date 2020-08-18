
import { Todo } from "./interfaces";


// const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=Odesa&units=metric&appid=5597f4e93e8d47d6ecf0af76c13664e8';
export const DATA_BASE_URL = 'https://react-native-first-99f79.firebaseio.com/';

export const getData = async <T>(lat:string, lon:string): Promise<T> => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=be6a5f24490978b9909013791b81b43e`;

  const response = await fetch(weatherURL);
  const result = await response.json();

  return result;
};

const PRIVATE_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
export const getRates = async <T>(): Promise<T> => {
  const response = await fetch(PRIVATE_URL);
  const result = await response.json();

  return result;
};

interface Rates {
  base_ccy: string;
  buy: string;
  ccy: string;
  sale: string;
}

// const getRatesCourse = async () => {
//   const rates = await getRates<Rates[]>();
//   const course = rates.find((item) => item.base_ccy === 'UAH' && item.ccy === 'USD');
//   return course;
// };

export const convertDataToString = (date: moment.Moment) => {
  const dateToCompare = Number(date+'');
  const optimized = new Date(Number(date+''));
  const year = optimized.getFullYear();
  const month = optimized.getMonth();
  const monthDay = optimized.getDate();
  return [year, month, monthDay]
}

export const calculateFilteredTodos = (
    todosFromServer: Todo[], category: string, option: string, sortBy: string
  ) => {

    if(todosFromServer.length) {

      const filteredTodos = (category === 'All') 
      ? todosFromServer
      : todosFromServer.filter(todo => todo.category === category);
      let filtered;
      switch (option) {
        case 'unfinished':
          filtered = filteredTodos.filter(todo => todo.completed === false)
          break;
        case 'completed':
          filtered = filteredTodos.filter(todo => todo.completed === true)
          break;
        case 'all': 
          filtered = filteredTodos;
          break;
        case 'overdue': 
        filtered = filteredTodos.filter(todo => {
          const endDate: number = new Date(todo.deadline[0], todo.deadline[1], todo.deadline[2]).getTime();
          const dateNow: number = Date.now();
          if (dateNow > endDate && !todo.completed) {
            return todo
          }
        });
        break;
        default: 
          filtered = filteredTodos;
          break;
      }
    
      let sorted;
      switch(sortBy) {
        case 'alphabetically':
          sorted = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
        case 'by date of create':
          sorted = filtered.sort((a, b) => {
            const aStartDate = new Date(a.startDate[0], a.startDate[1], a.startDate[2]);
            const bStartDate = new Date(b.startDate[0], b.startDate[1], b.startDate[2]);
            return (+aStartDate <= +bStartDate) ? -1 : 1;
          })
          break;
    
        case 'by deadline': 
          sorted = filtered.sort((a, b) => {
            const aDeadline = new Date(a.deadline[0], a.deadline[1], a.deadline[2]);
            const bDeadline = new Date(b.deadline[0], b.deadline[1], b.deadline[2]);
            return (+aDeadline >= +bDeadline) ? 1 : -1;
          })
          break;
    
      }
      return sorted;
    }
    return []
}

// console.log(getRatesCourse);
