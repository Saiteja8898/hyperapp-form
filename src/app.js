import { app, h } from 'hyperapp';
import idFields from './components/idFields';
import { inputFieldLabels } from './shared/const';
import './styles/main.scss';

const defaultState = {
    userSearchFields: {},
    searchFields: [0],
    maxNoOfSearchFields: Object.values(inputFieldLabels).length - 1
};


app({
    init: defaultState,
    view: (state) => h('main', {class: 'main-container'}, [
    idFields({ ...state})
    ]),
    node: document.getElementById('app')
})