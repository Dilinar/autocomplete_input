import { 
  useState, 
  useEffect 
} from 'react';
import { connect } from 'react-redux';

import { fetchUserData }  from '../../actions/users';

export function Input({ users, fetchUserData }: any) {

  const [ text, setText ] = useState('');
  const [ suggestions, setSuggestions ] = useState([]);
  const [ idx, setIdx ] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    let matches = [];
    if (e.target.value.length > 0) {
      matches = (users.sort(compare) || []).filter((user: any) => {
        const regex = new RegExp('^' + `${e.target.value}`,'gi');
        return user.name.match(regex);
      })
    }
    setSuggestions(matches);
    setText(e.target.value);
    setIdx(0);
  }

  function handlePickSuggestion(text: string) {
    setText(text);
    setSuggestions([]);
  }

  function handleBlur() {
    setTimeout(() => {
      setSuggestions([]);
    }, 100)
  }

  function handleSuggestionsList(e: any) {
      if (e.keyCode === 40) {
        setIdx(idx + 1);
        if (idx >= suggestions.length - 1) {
          setIdx(suggestions.length - 1);
        }
      }
      if (e.keyCode === 38) {
        setIdx(idx - 1);
        if (idx <= 1) {
          setIdx(0);
        }
      }
      else if (e.keyCode === 13) {
        e.preventDefault();
        setText(suggestions[idx].name);
        setSuggestions([]);
      }
    }

  function compare(a: any, b: any) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let comparison = 0;

    if (nameA > nameB) {
      comparison = 1;
    }
    else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  return (
    <div className='App'>
      <input type='text' 
        value={text} 
        onChange={handleText}
        onBlur={handleBlur}
        onKeyDown={handleSuggestionsList}
      />
  
      {suggestions.map((suggestion, index) => 
        <div 
          key={index} 
          className={idx === index ? 'picked suggestions' : 'suggestions'}
          onMouseEnter={() => setIdx(index)}
          onMouseLeave={() => setIdx(0)}
          onClick={() => handlePickSuggestion(suggestion.name)}>
          {suggestion.name}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserData: () => dispatch(fetchUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
