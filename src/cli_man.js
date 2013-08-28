/*!
 * Javascript Linux manual class v. 0.1
 *
 * Copyright (c) 2013 Rodrigo De la Garza
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */



FileMan = {
	'display': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		display - display an image on any workstation running X',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		display file',
  			'',
			'	DESCRIPTION',
			'',
			'		Display is a machine architecture independent image processing ',
			'		and display program. It can display an image on any workstation ',
			'		screen running an X server. Display can read and write many of ',
			'		the more popular image formats (e.g. JPEG, TIFF, PNM, Photo CD, etc.).',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'ls': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		ls - list directory contents',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		ls',
  			'',
			'	DESCRIPTION',
			'',
			'		List information about the FILEs (the current directory by default).',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'cd': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		cd - Change of directory',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		cd',
  			'',
			'	DESCRIPTION',
			'',
			'		Open a directory (url) in the browser screen.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'rm': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		rm - remove files or directories ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		rm FILE...',
  			'',
			'	DESCRIPTION',
			'',
			'		Removes each specified file. By default, it does not remove directories.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'wget': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		wget - Wget Manual ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		wget URL... ',
  			'',
			'	DESCRIPTION',
			'',
			'		Open a selected website.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'man': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html(' !!!! SERIOUSLY !!!!!  man^2 '));
		
	}},
	'locate': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		locate - look for an indexed file in the system. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		locate SOMETHING... ',
  			'',
			'	DESCRIPTION',
			'',
			'		Will look for a file containing the desired SOMETHING... Thoughts and ideas under development...',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'sleep': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		sleep - set the system on sleep mode for a few seconds. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		sleep ',
  			'',
			'	DESCRIPTION',
			'',
			'		Disable the screen for 5 seconds to resfresh toughts... Thoughts and ideas under development...',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'exit': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		exit - Turn machine off. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		exit ',
  			'',
			'	DESCRIPTION',
			'',
			'		Turn off machine by disbaling command line interface.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'logout': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		logout - Turn machine off. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		logout ',
  			'',
			'	DESCRIPTION',
			'',
			'		Turn off machine by disbaling command line interface.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'quit': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		quit - Turn machine off. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		quit ',
  			'',
			'	DESCRIPTION',
			'',
			'		Turn off machine by disbaling command line interface.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'restart': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		restart - Restart system. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		restart ',
  			'',
			'	DESCRIPTION',
			'',
			'		Restart system command by reloading current screen.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'reboot': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		reboot - Restart system. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		reboot ',
  			'',
			'	DESCRIPTION',
			'',
			'		Restart system command by reloading current screen.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'shutdown': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		shutdown - Shutdown system. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		shutdown ',
  			'',
			'	DESCRIPTION',
			'',
			'		Shutdown system command by disabling current screen.',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'poweroff': {type:'manual_entry', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print();
		$.each([
			'	NAME',
			'',
			'		poweroff - Poweroff system. ',
			'',
			'',
			'	SYNOPSIS',
			'',
			'		poweroff ',
  			'',
			'	DESCRIPTION',
			'',
			'		Poweroff system command by disabling current screen.',
		], function(num, line) {
			terminal.print(line);
		});
	}}
	
};

TerminalShell.man = FileMan;

TerminalShell.commands['man'] = function(terminal, path) {
	
	if (path in this.man) {
		if (this.man[path].type == 'manual_entry') {
			this.man[path].read(terminal);
		} 
	} else {
		terminal.print('Fat fingers... type correctly!');
	}
};


/*

//Replaced using cat algorithm to extend manual pages

TerminalShell.commands['man'] = function(terminal, what) {
	pages = {
		'display': 'NAME display - display an image:  SYNOPSIS - display file ',   
		'last': 'Man, last night was AWESOME.',
		'help': 'Man, help me out here.',
		'next': 'Request confirmed; you will be reincarnated as a man next.',
		'cat':  'You are now riding a half-man half-cat.'
	};
	if (!oneLiner(terminal, what, pages)) {
		terminal.print('Oh, I\'m sure you can figure it out.');
	}
};
*/