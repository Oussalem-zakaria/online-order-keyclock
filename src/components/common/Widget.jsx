const Widget = ({name, value, color}) => {

	return (
		<>
			<div className={`p-4 ${color} text-white rounded-xl shadow-sm`}>
				<h3 className="text-lg font-semibold">{name}</h3>
				<p className="text-2xl mt-2">{value}</p>
			</div>
		</>
	)
}

export default Widget;