import { Fragment, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { BiXCircle, BiImageAdd, BiHeart, BiMessageRounded, BiShare } from 'react-icons/bi';
import { Avatar, Button, Menu, MenuItem, Fade, Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Profile() {
    //----------------------------------------------Phan xu li render up post---------------------------------------
    const [btnUpLoad, setBtnUpLoad] = useState(false);

    //phan set true false cho man hinh up post
    const handleUpLoad = () => {
        setBtnUpLoad(true);
    };

    const containerRef = useRef(null);

    const unrenderUpPost = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setBtnUpLoad(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', unrenderUpPost);
        return () => {
            document.removeEventListener('mousedown', unrenderUpPost);
        };
    });

    //Render image khi nhập từ input
    const [imageRender, setImageRender] = useState();

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];

        //Lấy link ảnh bằng cách đặt một thuộc tính
        file.preview = URL.createObjectURL(file);
        setImageRender(file);
        console.log(URL.createObjectURL(file));
    };

    //------------------------Render Edit profile------------------------------------------------------------------------

    const [editProfile, setEditProfile] = useState(false);

    //Phan set true false cho btn edit Profile
    const handleEdit = () => {
        setEditProfile(true);
    };

    const containerRefEditProfile = useRef(null);

    const unrenderEditProfile = (e) => {
        if (containerRefEditProfile.current && !containerRefEditProfile.current.contains(e.target)) {
            setEditProfile(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', unrenderEditProfile);
        return () => {
            document.removeEventListener('mousedown', unrenderEditProfile);
        };
    });

    //Btn Trang rieng tu hoac cong khai
    const [loading, setLoading] = React.useState(true);
    function handleClickBtn() {
        setLoading(true);
    }

    // Xử lí render menu của bài viết

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Xử lí chuyển đến trang chi tiết bài viết khi click vào bài post
    const navigation = useNavigate();

    const handleClickPage = () => {
        navigation('/DetailPost');
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('profile')}>
                    <div className={cx('wr_info')}>
                        <div className={cx('info')}>
                            <h2>User_Name</h2>
                            <p className={cx('user_id')}>User_id</p>
                            <p className={cx('sum_fr')}>Có 10 bạn bè</p>
                        </div>
                        <div className={cx('wr_img_info')}>
                            <img
                                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Apa45SkFqF13fW8Y55ccGWV&oh=00_AYBKaRhTj--ryFQJ_wAwyZss_pfxB7TIDeIO8OMthJOOOA&oe=671566A6"
                                alt="avata user"
                            />
                        </div>
                    </div>
                    <div className={cx('wr_btn_edit_profile')} onClick={handleEdit}>
                        <div className={cx('btn_title_edit')}> Chỉnh sửa trang cá nhân</div>
                    </div>
                </div>

                <div className={cx('wr_upl')}>
                    <div className={cx('img_startus')}>
                        <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                    </div>
                    <div onClick={handleUpLoad} className={cx('des_startus')}>
                        <div className={cx('des')}>Có gì hot?</div>
                    </div>
                    <div className={cx('btn_upl_stt')}>
                        <button onClick={handleUpLoad} className={cx('btn_upload')}>
                            Đăng
                        </button>
                    </div>
                </div>

                {/* Phần bài viết trong trang cá nhân */}
                <div className={cx('wr_post')} onClick={handleClickPage}>
                    <div className={cx('wr_image')}>
                        <Avatar
                            alt="My avatar"
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>
                    <div className={cx('container_post')}>
                        <div className={cx('my_user')}>
                            <div className={cx('id_and_day')}>
                                <p>my_id</p>
                                <span>01/01/2024</span>
                            </div>
                            <div className={cx('menu')}>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className={cx('btn_menu')}
                                >
                                    ...
                                </Button>
                                <Menu
                                    className={cx('wr_menu')}
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem className={cx('menu_item')} onClick={handleClose}>
                                        Chỉnh sửa
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>Xoá bài viết</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className={cx('file_post')}>
                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                        </div>
                        <div className={cx('interact')}>
                            <button className={cx('like')}>
                                <BiHeart />{' '}
                            </button>{' '}
                            <label>Like</label>
                            <button className={cx('comment')}>
                                <BiMessageRounded />{' '}
                            </button>{' '}
                            <label>Comment</label>
                            <button className={cx('share')}>
                                <BiShare />
                            </button>{' '}
                            <label>Share</label>
                        </div>
                    </div>
                </div>
                <div className={cx('wr_post')}>
                    <div className={cx('wr_image')}>
                        <Avatar
                            alt="My avatar"
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>
                    <div className={cx('container_post')}>
                        <div className={cx('my_user')}>
                            <div className={cx('id_and_day')}>
                                <p>my_id</p>
                                <span>01/01/2024</span>
                            </div>
                            <div className={cx('menu')}>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className={cx('btn_menu')}
                                >
                                    ...
                                </Button>
                                <Menu
                                    className={cx('wr_menu')}
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem className={cx('menu_item')} onClick={handleClose}>
                                        Chỉnh sửa
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>Xoá bài viết</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className={cx('file_post')}>
                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                        </div>
                        <div className={cx('interact')}>
                            <button className={cx('like')}>
                                <BiHeart />{' '}
                            </button>{' '}
                            <label>Like</label>
                            <button className={cx('comment')}>
                                <BiMessageRounded />{' '}
                            </button>{' '}
                            <label>Comment</label>
                            <button className={cx('share')}>
                                <BiShare />
                            </button>{' '}
                            <label>Share</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Xử lí render info post */}
            {btnUpLoad && (
                <div className={cx('wr_position_up_post')}>
                    <div className={cx('relative_wr')}>
                        <div ref={containerRef} className={cx('position_wr_add_post')}>
                            <div className={cx('wr_startus')}>
                                <div className={cx('img_startus')}>
                                    <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                                </div>
                                <div className={cx('des_startus')}>
                                    <div className={cx('my_user_id')}>user_id</div>
                                    <input placeholder="Có gì hot?" />
                                    <div className={cx('wr_inp_img')}>
                                        <input onChange={handlePreviewImage} type="file" className={cx('inp_img')} />
                                        <label>
                                            <BiImageAdd className={cx('img_icon')} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info_render')}>
                                <div className={cx('img_render')}>
                                    {imageRender && (
                                        <img
                                            src={imageRender.preview}
                                            alt=""
                                            style={{ width: 'auto', height: 100, borderRadius: '15px' }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={cx('wr_btn_up')}>
                                <button className={cx('up_post')}>Đăng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Xử lí render edit profile */}
            {editProfile && (
                <div className={cx('wr_position_up_post')}>
                    <div className={cx('relative_wr')}>
                        <div ref={containerRefEditProfile} className={cx('position_wr_add_post')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('wr_edit_item')}>
                                    <div className={cx('my_name')}>
                                        <span>Tên</span>
                                        <p>user_name</p>
                                    </div>
                                    <div className={cx('my_avatar')}>
                                        <img
                                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                                            alt="my avatar"
                                        />
                                    </div>
                                </div>
                                <div className={cx('wr_edit_item')}>
                                    <div className={cx('my_id')}>
                                        <p>Id</p>
                                        <input type="text" placeholder='My_id'/>
                                    </div>
                                    
                                </div>
                                <div className={cx('wr_edit_item')}>
                                    <div className={cx('my_des')}>
                                        <p>Tiểu sử</p>
                                        <input type="text" placeholder='Nhập tiểu sử...'/>
                                    </div>
                                    
                                </div>
                                <div className={cx('wr_edit_item')}>
                                    <div className={cx('my_status')}>
                                        <p>Trang cá nhân riêng tư</p>
                                        <FormControlLabel className={cx('status')}
                                        sx={{ display: 'block' }}
                                        control={
                                            <Switch
                                                checked={loading}
                                                onChange={() => setLoading(!loading)}
                                                name="loading"
                                                color="primary"
                                            />
                                        }
                                        
                                    />
                                    </div>
                                    
                                </div>
                                <div className={cx('btn_confirm')}>Xong</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Profile;
