import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ImageGame.css';
import backgroundMusic from '../music/bg3.mp3';
import successSound from '../music/success.mp3';
import failedSound from '../music/failed.mp3';
import wrongSelection from '../music/wrong_selection.mp3';
import { Link } from 'react-router-dom';


const bgMusic = new Audio(backgroundMusic);
bgMusic.loop = true;
bgMusic.volume = 0.4;

const ImageGame = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [gameData, setGameData] = useState(null);
    const [level, setLevel] = useState(1);  // 添加关卡计数器
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    
    const successAudio = new Audio(successSound);
    const failedAudio = new Audio(failedSound);
    const wrongSelectionAudio = new Audio(wrongSelection);
    
    
    const handlePlayMusic = () => {
        if (isMusicPlaying) {
            bgMusic.pause(); // 停止播放
            
        } else {
            // 尝试播放并处理可能的错误
            bgMusic.play().catch(err => {
                console.error("播放失败，需要用户交互:", err);
                // 可以选择在这里显示一些用户提示，例如“请点击页面后再试”
            });
        }
        setIsMusicPlaying(!isMusicPlaying); // 切换播放状态
    };
    
    
    useEffect(() => {
        fetchImagesForLevel(level); // 初始加载
    }, [level]); // 当 level 改变时，重新加载

    const fetchImagesForLevel = async (currentLevel) => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/v1/game/match/${currentLevel}/new`);
            setGameData(response.data); // 更新游戏数据
            setSelectedImages([]); // 清空选中的图片
            setShowAlert(false); // 隐藏提示
        } catch (error) {
            console.error('Error fetching images:', error);
            setAlertMessage('Error loading images');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    useEffect(() => {
        // 初始图片渐显
        setTimeout(() => {
            const imgs = document.querySelectorAll('.game-img');
            imgs.forEach(img => img.style.opacity = 1);
        }, 1000);
    }, []);


    const handleImageClick = (rowIndex, colIndex) => {
        // 使用组合索引作为每张图片的唯一标识
        const imageIndex = `${rowIndex}-${colIndex}`;
        setSelectedImages(prevSelectedImages => {
            const isSelected = prevSelectedImages.includes(imageIndex);
            if (isSelected) {
                return prevSelectedImages.filter(index => index !== imageIndex);
            } else {
                return [...prevSelectedImages, imageIndex];
            }
        });
    };
    

    const handleConfirmClick = () => {
        if (selectedImages.length < 2) {
            setAlertMessage('Choose at least two images');
            setShowAlert(true);
            wrongSelectionAudio.play()
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return;
        }

        const selectedIds = selectedImages.map(index => {
            const [rowIndex, colIndex] = index.split('-').map(Number);
            return gameData.map[rowIndex][colIndex].image_id;
        });

        const firstSelectedId = selectedIds[0];
        const allSame = selectedIds.every(id => id === firstSelectedId);

        if (allSame) {
            // 显示成功信息
            setAlertMessage(gameData.success_text.join(' '));
            setShowAlert(true);
            successAudio.play();
            console.log("Loading to next level")
            setTimeout(() => {
                setShowAlert(false);
                setLevel(level + 1); // 提升关卡
            }, 3000);
        } else {
            // 显示失败信息
            setAlertMessage(gameData.failure_text.join(' '));
            setShowAlert(true);
            failedAudio.play();
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };

    if (level === 4) {
        // 在第4关成功后，导航到"CongratsPage"页面
        return (
          <div className="content-wrapper">
            <div className="centered-container">
              <p className="gohome_reminder">Congrats! You have completed all levels!</p>
              <Link to="/">
                <button className="gohome-button">Go to Home Page</button>
              </Link>
            </div>
          </div>
        );
      }

    return (
        <div className="content-wrapper">

            {gameData && <div className="container">
                {gameData.map.map((row, rowIndex) => 
                    row.map((item, colIndex) => (
                        <img
                            key={`${rowIndex}-${colIndex}`}
                            src={item.url}
                            alt={`Image ${item.image_id}`}
                            onClick={() => handleImageClick(rowIndex, colIndex)}
                            className={`game-img ${selectedImages.includes(`${rowIndex}-${colIndex}`) ? 'selected' : ''}`}
                            style={{ opacity: 1 }}
                        />
                    ))
                )}
            </div>}
            <div className="button-container">
                <button onClick={handlePlayMusic} className="music-button">
                    {isMusicPlaying ? "Stop Music" : "Play Music"}
                </button>
                <button onClick={handleConfirmClick} className="confirm-button">Confirm</button>
            </div>
            {showAlert && (
                <div className={`alert-box ${showAlert ? 'show' : ''}`}>
                    <p>{alertMessage}</p>
                </div>
            )}
            {/* <img src="/path/to/logo.svg" alt="Logo" className="logo" /> */}
            
        </div>
    );
};

export default ImageGame;
