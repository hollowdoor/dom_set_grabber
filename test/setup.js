
function createTopElements(){

    let container = create('div');
    let p1 = create('p');
    let inputElement = create('input', {placeholder: 'Element Type'});
    let changeElement = create('button');
    let inputWidth = create('input', {placeholder: 'Element Width'});
    let changeWidth = create('button');
    let input1 = create('div');
    let input2 = create('div');
    let ol = create('ol');
    let p2 = create('p');

    append(input1, inputElement);
    append(input1, changeElement);
    append(input2, inputWidth);
    append(input2, changeWidth);

    changeElement.innerHTML = 'Change Element';
    changeWidth.innerHTML = 'Change Width';
    p1.textContent = 'Try different elements.';
    p2.textContent = 'Adjust the sliders to change the line\'s position.';
    [p1, input1,input2,p2, ol]
    .forEach(e=>append(container, e));

    container.style.margin = '0 25% 0 25%';
    container.style.border = '1px solid black';
    container.style.padding = '7px';

    return {
        container,
        inputElement,
        changeElement,
        inputWidth,
        changeWidth,
        ol
    };
}
export default function setup(startup, type){
    let line = startup(type);
    let {
        container,
        inputElement,
        changeElement,
        inputWidth,
        changeWidth,
        ol
    } = createTopElements();

    let min = -100;
    let max = 700;

    function reset(){

    }

    changeElement.addEventListener('click', v=>{
        line.element.parentNode.removeChild(line.element);
        console.log('Changed Element ',inputElement.value);
        line = startup(inputElement.value);
    });

    changeWidth.addEventListener('click', v=>{
        line.width = inputWidth.value;
    });

    ['x1', 'y1', 'x2', 'y2']
    .forEach(n=>{

        let li = create('li');
        let div = create('div');
        let span1 = create('span');
        let span2 = create('span');
        let input1 = create('input', {type: 'text', size:4});
        let input2 = create('input', {type: 'text', size:4});
        let range = create('input', {
            type: 'range',
            id: n + '-range',
            min: min,
            max: max
        });
        let output = create('output');
        attr(output, 'for', n + '-range');
        div.style.fontWeight = 'bold';
        output.value = range.value;

        div.textContent = n;
        span1.textContent = 'min ';
        span2.textContent = ' max ';
        input1.value = min;
        input2.value = max;

        addEvent(range, 'input', e=>{
            output.value = range.value;
        });

        addEvent(input1, 'input', e=>{
            attr(range, 'min', input1.value);
        });

        addEvent(input2, 'input', e=>{
            attr(range, 'max', input2.value);
        });

        addEvent(range, 'input', e=>{
            line[n] = range.value;
        });

        [div, span1, input1, span2, input2, range, output]
        .forEach(el=>append(li, el));
        append(ol, li);
    });
    append(document.body, container);
}

function addEvent(el, event, listener){
    el.addEventListener(event, listener, false);
}

function attr(el, name, value){
    el.setAttribute(name, value);
}

function append(el, child){
    el.appendChild(child);
}

function create(name, attrs){
    let el = document.createElement(name);
    Object.keys(attrs || {}).forEach(key=>{
        attr(el, key, attrs[key]);
    });
    return el;
}
