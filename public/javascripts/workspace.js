$(document).ready(function() {
	$("[name='my-checkbox']").bootstrapSwitch();
	$("[name='my-checkbox']").bootstrapSwitch('setOnLabel', 'Sketch');
	$("[name='my-checkbox']").bootstrapSwitch('setOffLabel', 'Design');
	$("[name='my-checkbox']").bootstrapSwitch('setSizeClass', 'switch-large');
	$("[name='my-checkbox']").bootstrapSwitch('onColor', 'success');
	$("[name='my-checkbox']").bootstrapSwitch('offColor', 'danger');
});
