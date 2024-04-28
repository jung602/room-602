import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import workstyle from './works.module.scss';
import Image from 'next/image';
import About from './about'



function Selectedwork() {
  
  const items = [

    {   id: 1, 
        title: 'XR Music Player',
        thumbnail : '/thumb.png',
        thumbnail2 : "/roro.jpg",
        thumbnail3 : '/roro.jpg',
        thumbnail4 : '/roro.jpg',
        explanation : 'blah balh',
        year : '2023'},
        
    { id: 2, 
      title: 'RORO',
      thumbnail : '/thumb.png',
      thumbnail2 : "/roro.jpg",
      thumbnail3 : '',
      thumbnail4 : '/samsung.png',
      explanation : 'blah balh',
      year : '2023'},

    { id: 3, 
      title: 'Nori',
      thumbnail : '/thumb.png',
      thumbnail2 : "/roro.jpg",
      thumbnail3 : '',
      thumbnail4 : '/samsung.png',
      explanation : 'blah balh',
      year : '2023'},
      
    { id: 4, 
      title: 'vivify',
      thumbnail : '/thumb.png',
      thumbnail2 : "/roro.jpg",
      thumbnail3 : '',
      thumbnail4 : '/samsung.png',
      explanation : 'blah balh',
      year : '2023'},
  ];

  

  const [openStates, setOpenStates] = useState(items.map(() => false));
  const contentRefs = useRef(items.map(() => React.createRef<HTMLDivElement>()));

  const [contentHeights, setContentHeights] = useState(items.map(() => 0));

  // openStates가 변경될 때마다 높이 다시 계산
  useEffect(() => {
    const heights = contentRefs.current.map(ref => ref.current ? ref.current.scrollHeight : 0);
    setContentHeights(heights);
  }, [openStates]); 

  const toggleOpenState = (index: number) => {
    const updatedOpenStates = openStates.map((_, i) => i === index ? !openStates[index] : false);
    setOpenStates(updatedOpenStates);
  };



  return (
    <div className={workstyle.body}>
      <div className={workstyle.projects}>
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={classNames(workstyle.project, {[workstyle.open]: openStates[index]})}
            onClick={() => toggleOpenState(index)}>
                        <div className={workstyle.gridContainer}
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                         >
                        </div>

                        <div className={workstyle.folderImg} style={{ backgroundImage: `url(${item.thumbnail2})` }} />
                        <div className={workstyle.folderImg2} style={{ backgroundImage: `url(${item.thumbnail3})` }} />
                        <div className={workstyle.folderImg3} style={{ backgroundImage: `url(${item.thumbnail4})` }} />
                       
                        <span className={workstyle.explanation}>
                          <sup className={workstyle.count}>{item.year}</sup>
                          <span>{item.title}</span>
                          <span
                           style={{
                            display: 'block'
                          }}>{item.explanation}</span>
                        </span>
                    
                          <div
                          ref={contentRefs.current[index]}
                          className={classNames(workstyle.content, {[workstyle.open]: openStates[index]})}
                          style={{ 
                            maxHeight: openStates[index] ? `${contentHeights[index]}px` : '0',
                            transition: 'max-height 0.5s ease-in-out'
                          }}>
                              {item.title === 'XR Music Player' && < About/>}
                              {item.title === 'RORO' && < About/>}
                              {item.title === 'Nori' && < About/>}
                              {item.title === 'vivify' && < About/>}

                            </div>
                       </div>
                
            ))}
      </div>
      
    </div>
    
  );
}


export default Selectedwork;


