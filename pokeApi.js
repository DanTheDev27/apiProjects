
getData();
async function getData() {
    try {
        const pokemonName = document.getElementById('pokeInput').value.toLowerCase();
        if(pokemonName == ""){
            preventDefault();
        }else{
            clearPreviousData();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if(!response.ok) {
            throw new Error('could not fetch request');
        }

        const data = await response.json();
        const pokeName = data.name;
        console.log("name is " + pokeName);
        console.log(data);
        const pokeSprite = data.sprites.other['official-artwork'].front_default;
        const ul = document.getElementById('emptyList');
        const statsList = document.getElementById('stats');
        const pokeType = document.getElementById('type');
        const pokeHeight = document.getElementById('height');
        const pokeWeight = document.getElementById('weight');

        // loop through types to get pokemon type data
        for(let obj of data.types) {
            console.log('pokemon type: ' + obj.type.name);
            // pokeType.innerHTML= `<h1>${obj.type.name}</h1>`;
            const h3 = document.createElement('h3');
            const itmText = 'Type: ' + obj.type.name.charAt(0).toUpperCase() + obj.type.name.slice(1);
            h3.textContent = itmText;
            pokeType.appendChild(h3);

        }

        //pokemon height and weight
        let height = data.height;
        let weight = data.weight;
        let floatWeight = weight / 10;
        let floatHeight = height / 10;
        pokeHeight.innerHTML = `<h3>Height: ${floatHeight} m</h3>`;
        pokeWeight.innerHTML = `<h3>Weight: ${floatWeight} kg</h3>`;

        //commented out pokemon moves

        // for(let move of data.moves) {
        //     // console.log(`${pokeName} move: ${move.move.name}`);
        //         const li = document.createElement('li');
        //         const itemText = move.move.name.charAt(0).toUpperCase()+move.move.name.slice(1);
        //         li.textContent= itemText;
        //         ul.appendChild(li);
        //         document.getElementById('moves').style.display='block';
        //     };

        for(let stat of data.stats){
            console.log(`stats \n${pokeName} stat: ${stat.base_stat} ${stat.stat.name}`)
            var list = document.createElement('h3');
            const itmText= `${stat.stat.name.charAt(0).toUpperCase()+ stat.stat.name.slice(1)}: ${stat.base_stat}  `;
            list.textContent=itmText;
            statsList.appendChild(list);
            document.getElementById('stats').style.display='block';
        }
        
        //display pokemon data and sprite
        let num = data.id;
        // let paddedNum = num <100 ? '00' + num : num.toString();
        let paddedId;
        if (num  < 10) {
            paddedId = '000' + num;
        } else if (num >= 10 && num <100){
            paddedId = '00' + num;
        } else if (num >= 100 && num < 1000) {
            paddedId = '0' + num;
            console.log('second else if')
        } else {
            paddedId = num;
            console.log('end of if block');
        }
        const pokeData = document.getElementById('pokeName');
        pokeData.innerHTML=`<h1>${pokeName.charAt(0).toUpperCase()+ pokeName.slice(1)}</h1><h1>#${paddedId}</h1>`;

        const pokemonSprite = document.getElementById('pokemonSprite');
        pokemonSprite.src= pokeSprite;
        pokemonSprite.style.display= 'block';

    }}
    catch(error){
        console.log(error);
    }
}
function clearPreviousData() {
    // Clear old type data
    document.getElementById('type').innerHTML = '';
    
    // Clear old height and weight data
    document.getElementById('height').innerHTML = '';
    document.getElementById('weight').innerHTML = '';

    // Clear old stats data
    document.getElementById('stats').innerHTML = '';
    
    // Clear old poke name
    document.getElementById('pokeName').innerHTML = '';

    // Hide old sprite and clear its src
    const pokemonSprite = document.getElementById('pokemonSprite');
    pokemonSprite.style.display = 'none';  // Hide old sprite
    pokemonSprite.src = '';  // Clear the sprite src
}