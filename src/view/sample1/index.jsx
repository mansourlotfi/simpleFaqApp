import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 150,
		direction: 'rtl'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 20,
		Width: 400,
		minWidth: 500
	},
	image: {
		width: 240,
		height: 240
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	sample1: {
		direction: 'rtl'
	}
}));

export default function Sample1() {
	const classes = useStyles();

	const [ books, setBooks ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setBooks(await axios.get(`https://picsum.photos/v2/list`).then((res) => res.data));
		}
		fetchData();
	}, []);

	return (
		<div className="sample1">
			<div className={classes.root}>
				{books.map((book) => (
					<Paper className={classes.paper} elevation={0}>
						<Grid container>
							<Grid item>
								<ButtonBase className={classes.image}>
									<img className={classes.img} alt={book.url} src={book.download_url} />
								</ButtonBase>
							</Grid>
							<Grid item xs={12} sm container>
								<Grid item xs container direction="column" spacing={2}>
									<Grid item xs tyle={{ padding: '15px' }}>
										<Typography
											gutterBottom
											variant="subtitle1"
											style={{
												paddingRight: '50px',
												fontFamily: 'yekan',
												fontSize: 24,
												fontWeight: 700
											}}
										>
											عنوان کتاب
										</Typography>
										<Typography
											variant="body2"
											gutterBottom
											style={{ padding: '15px', fontFamily: 'yekan', fontSize: 22 }}
										>
											لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
											طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
											لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
											بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
											آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
											بیشتری را برای طراحان رایانه سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
											استفاده قرار گیرد.
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											style={{ padding: '15px', fontFamily: 'yekan', fontSize: 22 }}
										>
											نویسنده:
											<br />
											{book.author}
											<br />
											گوینده: <br />
											{book.author}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				))}
			</div>
		</div>
	);
}
