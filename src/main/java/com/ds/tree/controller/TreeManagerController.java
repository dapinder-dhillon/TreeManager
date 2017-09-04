package com.ds.tree.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ds.tree.service.TreeNodeService;
import com.ds.tree.vo.TreeNodeVO;

/**
 * The Class TreeManagerController.
 */
@Controller
@RequestMapping("/tree")
public class TreeManagerController {

	@Value("${welcome.message:test}")
	private String message;

	@Autowired
	private TreeNodeService treeNodeService;

	/**
	 * Load the Tree home page.
	 *
	 * @param model the model
	 * @return the string
	 */
	@RequestMapping("/home")
	public String welcome(Map<String, Object> model) {
		model.put("message", this.message);
		return "tree";
	}

	/**
	 * Adds the node to the tree.
	 *
	 * @param treeNode the tree node
	 * @return the string
	 */
	@RequestMapping(value = "/addNode", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String addNode(@RequestBody TreeNodeVO treeNode) {
		treeNodeService.save(treeNode);
		return "Node Added to DB Successfully";
	}

	/**
	 * Find all nodes.
	 *
	 * @return the list
	 */
	@RequestMapping(value = "/allNodes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<TreeNodeVO> findAllNodes() {
		return treeNodeService.findAllNodes();
	}

	/**
	 * Removes the node.
	 *
	 * @param id the id
	 */
	@RequestMapping(value = "/removeNode/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void removeNode(@PathVariable("id") Integer id) {
		treeNodeService.removeNode(id);
	}

	/**
	 * Removes the all.
	 */
	@RequestMapping(value = "/removeAll", method = RequestMethod.DELETE)
	@ResponseBody
	public void removeAll() {
		treeNodeService.removeAll();
	}
}
