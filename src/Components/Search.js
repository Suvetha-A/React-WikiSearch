import React, { useState } from "react";

const Search=()=>{
    const[search,setSearch]=useState("");
    const[results,setResults]=useState([]);
    const[searchInfo,setSearchInfo]=useState({});

    const Handlesearch= async e => {
        e.preventDefault();
        if(search === " ") return;
    

        const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
        const response=await fetch(endpoint);

        if(!response.ok){
            throw Error(response.statusText);
        }

        const json=await response.json();
        setResults(json.query.search);
        setSearchInfo(json.query.searchinfo);
    }
    return(
        <div>
            <form onSubmit={Handlesearch}>
                <p className="sample">Wiki Search</p>
                <input className="Sample2" type="search" placeholder="Search..." value={search} 
                onChange={e=> setSearch(e.target.value)}/>
            </form>

        {(searchInfo.totalhits) ? <p id="s1">Search results:{searchInfo.totalhits}</p>: ''}
        
            <div className="results">
                {
                        results.map((result,ind)=>{
                        const url=`https://en.wikipedia.org/?curid=${result.pageid}`;
                    return(
                        <div className="result" key={ind}>
                            <h3>{result.title}</h3>
                            <p dangerouslySetInnerHTML={{__html:result.snippet}}></p>
                            <a href={url}>Read more</a>
                        </div>
                    )
                    }
                    )
                    }
            </div>

        </div>
    )
}
export default Search
