/*!
 * Extension of cli class v. 0.1
 *
 * Copyright (c) 2013 Rodrigo De la Garza
 *
 *  Based on:
 * 		Randall Munroe(http://xkcd.com/about/). 
 * 		XKCD CLI by Chromakode(http://chromakode.com). 
 *		Original CLI2 by Rod McFarland(http://thrind.xamai.ca). 
 *		Source code(http://github.com/chromakode/xkcdfools)
 *		
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */


function pathFilename(path,curr_dir = '') {
	
	return '../'+curr_dir+'/projects/VideoCaps/'+path;
	
}

function getRandomInt(min, max) {
	// via https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Math/random#Examples
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(items) {
	return items[getRandomInt(0, items.length-1)];
}


//var xkcdDisplay = TerminalShell.commands['display'] = function(terminal, path) {
	TerminalShell.commands['display'] = function(terminal, path) {
	function fail() {
		terminal.print($('<p>').addClass('error').text('display: unable to open image "'+path+'": No such file or directory.'));
		terminal.setWorking(false);
	}
	
	terminal.setWorking(true);
	
	window.setTimeout(function(){doDisplay()},3000);
	
	function doDisplay()
	{	
		if (path) {
			path = String(path);
			var curr_dir = terminal.config.current_dir;
			
			filename = pathFilename(path,curr_dir);

			if (curr_dir.length == 0) {
				terminal.print("No image found.");
				//return;
			}
			else
			{				
				var comic = $('<img>')
					.attr({src:filename, alt:path, title:''})
					.addClass('comic');
				
				terminal.print(comic);
			}
			
		} else {
			terminal.print("No option was done, please use 'man display' to learn more about this command.");
		}
		terminal.setWorking(false);
	}
	/*
	xkcd.get(num, function(data) {
		if (!filename || (filename == pathFilename(data.img))) {
			$('<img>')
				.hide()
				.load(function() {
					terminal.print($('<h3>').text(data.num+": "+data.title));
					$(this).fadeIn();
					
					var comic = $(this);
					if (data.link) {
						comic = $('<a>').attr('href', data.link).append($(this));
					}
					terminal.print(comic);
					
					terminal.setWorking(false);
				})
				.attr({src:data.img, alt:data.title, title:data.alt})
				.addClass('comic');
		} else {
			fail();
		}
	}, fail);
	*/
};


TerminalShell.commands['sudo'] = function(terminal) {
	var cmd_args = Array.prototype.slice.call(arguments);
	cmd_args.shift(); // terminal
	if (cmd_args.join(' ') == 'make me a sandwich') {
		terminal.print('Okay.');
	} else {
		var cmd_name = cmd_args.shift();
		cmd_args.unshift(terminal);
		cmd_args.push('sudo');
		if (TerminalShell.commands.hasOwnProperty(cmd_name)) {
			this.sudo = true;
			this.commands[cmd_name].apply(this, cmd_args);
			delete this.sudo;
		} else if (!cmd_name) {
			terminal.print('sudo what?');
		} else {
			terminal.print('sudo: '+cmd_name+': command not found');
		}
	}
};

TerminalShell.filters.push(function (terminal, cmd) {
	if (/!!/.test(cmd)) {
		var newCommand = cmd.replace('!!', this.lastCommand);
		terminal.print(newCommand);
		return newCommand;
	} else {
		return cmd;
	}
});

TerminalShell.commands['shutdown'] = TerminalShell.commands['poweroff'] = function(terminal) {
	if (this.sudo) {
		
		terminal.print($('<p>').html(' '));
		terminal.print('Broadcast message from '+ terminal.config.prompt);
		terminal.print();
		terminal.print('The system is going down for maintenance NOW!');
	
		return $('#screen').fadeOut();
	} else {
		terminal.print('Must be root.');
	}
};

TerminalShell.commands['logout'] =
TerminalShell.commands['exit'] = 
TerminalShell.commands['quit'] = function(terminal) {
	terminal.print('Bye.');
	$('#prompt, #cursor').hide();
	terminal.promptActive = false;
};

TerminalShell.commands['restart'] = TerminalShell.commands['reboot'] = function(terminal) {
	if (this.sudo) {
		TerminalShell.commands['poweroff'](terminal).queue(function(next) {
			window.location.reload();
		});
	} else {
		terminal.print('Must be root.');
	}
};

function linkFile(url, content = null) {
	if(content == null)
	{
		return {type:'dir', enter:function() {
			window.location = url;
		}};
	}
	else
	{
		return {type:'dirs', content:content};
	}
}

Filesystem = {
	'welcome.txt': {type:'file', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print($('<h4>').text('Welcome to Rodrigo De la Garza CLI.'));
		
		terminal.print($('<p>').html('E-Mail:josille@gmail.com; delagarza@swissonline.ch'));
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html('ABOUT ME :I am a Mexican/Spanish Web and Software developer. I hold a Master’s Degree in Internet and Web Technologies from RMIT University in Melbourne, Australia, and a Graduate Degree in Computer Systems Engineering from Monterrey University of Technology in Mexico City.'));
		terminal.print($('<p>').html('   '));
		terminal.print('I completed international professional studies including a Telecommunications course in Paris, France, and Culture, Job Ethics and Principles in Prague, Czech Republic.');
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html('   '));
		terminal.print('Linkedin:  http://www.linkedin.com/in/rodrigodlg');
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html('   '));
		
		terminal.print($('<p>').html('To list the <strong>AVAILABLE COMMANDS</strong> enter "help".'));
		
		terminal.print($('<p>').html('   '));
		terminal.print('Use "ls", "cat", and "cd" to navigate the filesystem.');
	}},
	'license.txt': {type:'file', read:function(terminal) {
		
		terminal.print($('<p>').html('jQuery classes and design done by Rodrigo De la Garza 2013'));
		terminal.print($('<p>').html('Based on jQuery classes from :: <a href="http://www.chromakode.com/">Chromakode, 2010</a> done to <a href="http://www.xkcd.com/">xkcd</a> '));
		terminal.print($('<p>').html('Client-side logic for Wordpress CLI theme :: <a href="http://thrind.xamai.ca/">R. McFarland, 2006, 2007, 2008</a>'));
		
		terminal.print();
		$.each([
			'This program is free software; you can redistribute it and/or',
			'modify it under the terms of the GNU General Public License',
			'as published by the Free Software Foundation; either version 2',
			'of the License, or (at your option) any later version.',
			'',
			'This program is distributed in the hope that it will be useful,',
			'but WITHOUT ANY WARRANTY; without even the implied warranty of',
			'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the',
			'GNU General Public License for more details.',
			'',
			'You should have received a copy of the GNU General Public License',
			'along with this program; if not, write to the Free Software',
			'Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.'
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'aboutme.txt': {type:'file', read:function(terminal) {
	
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('I am a Spanish, born Mexican Web and Software developer.'));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('I hold a Master’s Degree in Internet and Web Technologies from RMIT University in Melbourne, Australia, and a Graduate Degree in Computer Systems Engineering from Monterrey University of Technology in Mexico City.'));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('From 2005 to 2008 I worked as a senior web and software developer for Lightsoft Multimedia Consultants, a software, web and design solutions company in Mexico City. My role as a senior developer allowed me to work with the latest technologies for web development, gaining valuable experience in .Net frameworks 1.1, 2.0 and 3.0 , Java , Ajax, Adobe Flex, PHP, CSS and JavaScript, becoming familiar with different JavaScript frameworks and libraries such as JQuery, Mootools, Lytebox and Scriptaculous for dynamic layouts.'));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('During my Master degree studies in Australia (2009-2010), I was employed part time by a web solution company, Simplenet, where my daily tasks included small system maintenance in their different servers and layout/design advice.'));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('At the end of my Master degree studies, I was employed by MDPI AG, an open access publishing company in Basel, Switzerland, where I held the position of senior web developer and Switzerland IT coordinator. My role of web developer and IT coordinator gave me the opportunity to become an experienced PHP and Java developer, gaining knowledge while developing xslt stylesheets and xml templates, developing skills using javascript, jQuery and AJAX scripts, increasing my experience with linux and different technologies in order to solve common everyday issues. '));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('I had the pleasure of learning from more skilled developers’ new technologies and approaches to fulfill software developing challenges. I learned to maintain and upgrade MDPI AG publishing systems according to editors’, managers’ and employee’s needs, increasing my communication skills with non-technical employees. I had the opportunity of perform the migration of entire systems and MySQL databases between remote servers; learned the need of a cost effective solution by developing and maintaining the file format conversion system of MDPI AG, making a significant saving outsourcing expenses. In addition to this, I maintained constant communication with the IT office China regarding project development and data conversion tasks. '));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('In addition to my qualifications, I completed international professional studies including a Telecommunications course in Paris, France, and Culture, Job Ethics and Principles in Prague, Czech Republic. '));
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('By studying and working in different foreign countries, I have learned the importance of team work and creative problem solving when working in a culturally diverse environment, having as a goal to use my knowledge and training to help create a better experience between the user and the systems interfaces. '));
}},
	'experience.txt': {type:'file', read:function(terminal) {
	
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('IT AND PROGRAMMING SKILLS:'));
	terminal.print($('<br/>'));
	terminal.print();
		$.each([
			'	- Wide experience with User Interface guidelines.',
			'	- Wide experience debugging Web applications using Firebug add-on',
			'	- Development of .NET web based systems incorporating WEB 2 technologies.',
			'	- Development of client side web sites incorporating the use of AJAX and Adobe Flex.',
			'	- Wide experience working with Cascade style sheets CSS.',
			'	- Development with the usage of Javascript frameworks and libraries, JQuery, lytebox and scriptaculous.',
			'	- SQL Server and MySql designer and administrator.',
			'	- Wide Experience working with XML/XSLT',
			'	- Wide experience working with SQL, DDL and DML.',
			'	- Experience developing OLAP cubes.',
			'	- Developer analyst for iPod devices.',
			'	- Wide experience developing with C# .NET Visual Studio 2003, 2005.',
			'	- Experience developing JAVA applications using Eclipse.',
			'	- Experience developing web sites with Adobe Flex.',
			'	- Wide experience developing client web sites with JavaScript.',
			'	- Wide Experience developing web sites using PHP.',
			'	- Experience with audio and video streaming.',
		], function(num, line) {
			terminal.print(line);
		});
	
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('Languages:'));
	terminal.print($('<br/>'));
	terminal.print();
		$.each([
			'	- Native Spanish',
			'	- Fluent English',
			'	- Basic French',
			'	- Basic German',
		], function(num, line) {
			terminal.print(line);
		});
	}},
	'projects.txt': {type:'file', read:function(terminal) {
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html('Some projects done by me'));
		terminal.print($('<p>').html('  '));
		
		terminal.print();
		$.each([
			'########################################################',
			'  ',
			'Facebook more human',
			'   ',
			'Small web site, that uses the current facebook session (if any), ',
			'to display an animation over the facebook screen.,',
			' ',
			'########################################################',
			'   ',
			'   ',
			'########################################################',
			'  ',
			'Metro journey planner',
			'   ',
			'Prototype web site for tourism kiosk, using Google maps and dijkstra algorithm, ',
			'the site calculates the best possible route between two subway stations for the ',
			'historical center of Mexico City.',
			' ',
			'########################################################',
			'   ',
			'   ',
			'########################################################',
			'  ',
			'Video manipulation',
			'   ',
			'Prototype application for video manipulation, using convolution matrix transformation ',
			'and manipulation of integers and bytes arrays, the application provides basic ',
			'transformation effects for images and video files.',
			' ',
			'########################################################',
			'   ',
			'   ',
			'########################################################',
			'  ',
			'Blog about pictures of the world',
			'   ',
			'Blog using predefines templates and small code of google maps, inlcuding latitude ',
			'and longite coordinates, all pictures in this blog were taken by me and are shown ',
			'as they are, no software or filter were applied.',
			' ',
			'########################################################',
			'   ',
			'   ',
		], function(num, line) {
			terminal.print(line);
		});
		
		terminal.print($('<p>').html('   '));
		terminal.print($('<p>').html('Visit my url for more details: <a href="http://rodrigodlg.eu5.org/" target="blank">http://rodrigodlg.eu5.org/</a>'));
	}}
	
};

Filesystem['linkedin'] = linkFile('http://www.linkedin.com/in/rodrigodlg');

Filesystem['images'] = linkFile('none',Array("videoImage.jpg","videoImage1.jpg","videoImage2.jpg","videoImage3.jpg"));
TerminalShell.pwd = Filesystem;



TerminalShell.commands['cd'] = function(terminal, path) {
	if (path in this.pwd) {
		if (this.pwd[path].type == 'dir') {
			this.pwd[path].enter(terminal);
		}else if(this.pwd[path].type == 'dirs'){
			terminal.config.prompt = 'user@rodcli:/'+path+'$ ';
			terminal.config.current_dir = path;
			$('#prompt').html(terminal.config.prompt);
		} else if (this.pwd[path].type == 'file') {
			terminal.print('cd: '+path+': Not a directory');
		}
	} else if(path == '..'){		
			var new_prompt = '';
			var old_prompt = terminal.config.prompt;						
			var curr_dir = terminal.config.current_dir;
			
			terminal.config.current_dir = '';			
			
			new_prompt = old_prompt.replace(curr_dir,terminal.config.current_dir); 
			
			terminal.config.prompt = new_prompt;
			$('#prompt').html(terminal.config.prompt);
	} else {
		terminal.print('cd: '+path+': No such file or directory');
	}
};

TerminalShell.commands['dir'] =
TerminalShell.commands['ls'] = function(terminal, path) {
	var name_list = $('<ul>');
	if (path in this.pwd && this.pwd[path].type != 'file') {			
			var images = this.pwd[path].content;
			
			for (var i=0;i<images.length; i++)
			{
				name_list.append($('<li>').text(this.pwd[path].content[i]));
			}
	} else{
			
			if(terminal.config.prompt.substring(terminal.config.prompt.indexOf(':/')).length >4)
			{
				var new_path = terminal.config.prompt.substring(terminal.config.prompt.indexOf(':/')+2);
				var new_command = 'ls '+new_path.substring(0,new_path.length-2);
			
				Terminal.runCommand(new_command,false);
				
			}else{
			$.each(this.pwd, function(name, obj) {
				if (obj.type == 'dir' || obj.type == 'dirs' ) {
					name += '/';
				}
				name_list.append($('<li>').text(name));
			});
			}
	}
	terminal.print(name_list);
};


TerminalShell.commands['cat'] = function(terminal, path) {
	
	if (path in this.pwd) {
		if (this.pwd[path].type == 'file') {
			this.pwd[path].read(terminal);
		} else if (this.pwd[path].type == 'dir') {
			terminal.print('cat: '+path+': Is a directory');
		}
	
	} else {
		terminal.print('MEOWWWWW!!!!');
	}
};


TerminalShell.commands['rm'] = function(terminal, flags, path) {
	if (flags && flags[0] != '-') {
		path = flags;
	}
	if (!path) {
		terminal.print('rm: missing operand');
	} else if (path in this.pwd) {
		if (this.pwd[path].type == 'file') {
			delete this.pwd[path];
		} else if (this.pwd[path].type == 'dir') {
			if (/r/.test(flags)) {
				delete this.pwd[path];
			} else {
				terminal.print('rm: cannot remove '+path+': Is a directory');
			}
		} else if(this.pwd[path].type == 'dirs'){
			terminal.print('rm: cannot remove '+path+': The directory is not empty.');
		}
		
	} else if (flags == '-rf' && path == '/') {
		if (this.sudo) {
			TerminalShell.commands = {};
		} else {
			terminal.print('rm: cannot remove /: Permission denied');
		}
	}
};





TerminalShell.commands['wget'] = TerminalShell.commands['curl'] = function(terminal, dest) {
	if (dest) {
		terminal.setWorking(true);
		var browser = $('<div>')
			.addClass('browser')
			.append($('<iframe>')
					.attr('src', dest).width("100%").height(600)
					.one('load', function() {
						terminal.setWorking(false);
					}));
		terminal.print(browser);
		return browser;
	} else {
		terminal.print("Please specify a URL.");
	}
};



function oneLiner(terminal, msg, msgmap) {
	if (msgmap.hasOwnProperty(msg)) {
		terminal.print(msgmap[msg]);
		return true;
	} else {
		return false;
	}
}



TerminalShell.commands['locate'] = function(terminal, what) {
	terminal.print($('<p>').html('   '));
	terminal.print('I am still working on this... Brain loading....');
	terminal.setWorking(true);	
	window.setTimeout(function(){terminal.setWorking(false);},3000);
};



TerminalShell.commands['sleep'] = function(terminal, duration) {
	duration = Number(duration);
	if (!duration) {
		duration = 5;
	}
	terminal.setWorking(true);
	terminal.print("You take a nap.");
	$('#screen').fadeOut(1000);
	window.setTimeout(function() {
		terminal.setWorking(false);
		$('#screen').fadeIn();
		terminal.print("OK back to think...");
	}, 1000*duration);
};

/*
Help command to display all posibles commands options
*/
TerminalShell.commands['help'] = TerminalShell.commands['halp'] = function(terminal) {
	terminal.print($('<p>').html('   '));
	terminal.print($('<p>').html('List of commands available'));
	terminal.print($('<p>').html('   '));
	terminal.print('	- display: display an image on any workstation');
	terminal.print('	- cd: Change the current directory');
	terminal.print('	- dir, ls: list directory contents');
	terminal.print('	- rm: remove files or directories');
	terminal.print('	- wget, curl: GNU Wget Manual');
	terminal.print('	- man: format and display the on-line manual pages');
	terminal.print('	- locate: Enables system users to search entire filesystems without displaying unauthorized files');
	terminal.print('	- sleep: turn off the system for 5 seconds');
	terminal.print('	- cat: print files to the standard output');
	terminal.print('	- exit, logout, quit: cause normal program termination');
	terminal.print('	- restart, reboot: restart the system');
	terminal.print('	- shutdown, poweroff: bring the system down.');
}; 


/*
Initial load, where the information of the file welcome is loaded, this files is generated on the fly 
*/
var konamiCount = 0;
$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		Terminal.runCommand('cat welcome.txt');
	});
	
	$(document).konami(function(){
		function shake(elems) {
			elems.css('position', 'relative');
			return window.setInterval(function() {
				elems.css({top:getRandomInt(-3, 3), left:getRandomInt(-3, 3)});
			}, 100);	
		}
		
		if (konamiCount == 0) {
			$('#screen').css('text-transform', 'uppercase');
		} else if (konamiCount == 1) {
			$('#screen').css('text-shadow', 'gray 0 0 2px');
		} else if (konamiCount == 2) {
			$('#screen').css('text-shadow', 'orangered 0 0 10px');
		} else if (konamiCount == 3) {
			shake($('#screen'));
		} else if (konamiCount == 4) {
			$('#screen').css('background', 'url(/unixkcd/over9000.png) center no-repeat');
		}
		
		$('<div>')
			.height('100%').width('100%')
			.css({background:'white', position:'absolute', top:0, left:0})
			.appendTo($('body'))
			.show()
			.fadeOut(1000);
		
		if (Terminal.buffer.substring(Terminal.buffer.length-2) == 'ba') {
			Terminal.buffer = Terminal.buffer.substring(0, Terminal.buffer.length-2);
			Terminal.updateInputDisplay();
		}
		TerminalShell.sudo = true;
		konamiCount += 1;
	});
});